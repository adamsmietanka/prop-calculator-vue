<template>
  <div>
    <NumberInput name="Max airspeed"
                 :number="prop.maxSpeed"
                 rules="required|between:50,200"
                 :setter="setMaxSpeed"
                 unit="m/s"/>
    <NumberInput name="Cruise altitude"
                 :number="prop.cruiseAltitude"
                 step="0.1"
                 :rules="rulesAltitude()"
                 :setter="setCruiseAltitude"
                 unit="km"/>
    <ToggleableInput name="Diameter"
                     :model="prop.diameter"
                     :toggler="prop.diameterType"
                     step="0.01"
                     rules="required|between:0.5,5"
                     :setter="setDiameter"
                     unit="m" />
    <b-form-group label="Number of blades">
      <b-input-group :append="prop.numberOfBlades.toString()">
        <b-form-input type="range" v-model="numberOfBlades" min="2" max="4"/>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Blade pitch">
      <b-form-radio-group v-model="bladePitch" :options="['Variable', 'Fixed']"/>
    </b-form-group>
    <NumberInput name="Angle" v-if="bladePitch === 'Fixed'"
                 :number="prop.angle"
                 rules="required|between:10,60"
                 :setter="setAngle"
                 unit="°"/>
    <DisabledInput name="Power"
                   :model="prop.cruisePower"
                   unit="kW" />
    <DisabledInput name="Cn"
                   :model="Cn" />
    <b-form-group label="Blade material">
      <b-form-radio-group v-model="bladeMaterial" :options="['Metal', 'Composite', 'Wood']"/>
    </b-form-group>
    <DisabledInput name="Tip Mach Number"
                   :model="tipMach" :rules="rulesTip"/>
    <b-button block variant="primary" @click="update" class="mt-2">Optimize Diameter</b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NumberInput from '../NumberInput.vue';
import DisabledInput from '../DisabledInput.vue';
import ToggleableInput from '../ToggleableInput.vue';

export default {
  name: 'PropellerForm',
  components: {
    NumberInput,
    DisabledInput,
    ToggleableInput,
  },
  created() {
    this.$store.dispatch('setCruisePower', this.prop.cruiseAltitude);
    this.update();
  },
  computed: {
    ...mapState({
      prop: (state) => state.prop.form,
      table: (state) => state.prop.table,
      engine: (state) => state.engine,
    }),
    numberOfBlades: {
      get() { return this.prop.numberOfBlades; },
      set(v) {
        this.$store.dispatch('setNumberOfBlades', v);
      },
    },
    bladeMaterial: {
      get() { return this.prop.bladeMaterial; },
      set(v) { this.$store.dispatch('setBladeMaterial', v); },
    },
    bladePitch: {
      get() { return this.prop.bladePitch; },
      set(v) { this.$store.dispatch('setBladePitch', v); },
    },
    Cn() {
      const { cruisePower, maxSpeed } = this.prop;
      const Cn = maxSpeed * (this.rho / (cruisePower * 1000 * this.propSpeed ** 2)) ** 0.2;
      return parseFloat(Cn.toPrecision(5));
    },
    rho() {
      return 1.2255 * (1 - (this.prop.cruiseAltitude / 44.3)) ** 4.256;
    },
    soundSpeed() {
      return 340.3 * ((288.15 - 6.5 * this.prop.cruiseAltitude) / 288) ** 0.5;
    },
    propSpeed() {
      return (this.engine.revs / 60) * this.engine.ratio;
    },
    tipMach() {
      if (this.prop.diameterType === 'Manual') {
        const rotationSpeed = Math.PI * this.propSpeed * this.prop.diameter;
        const forwardSpeed = 1.2 * this.prop.maxSpeed;
        const a = Math.hypot(forwardSpeed, rotationSpeed) / this.soundSpeed;
        return parseFloat(a.toFixed(3));
      }
      return this.prop.mach;
    },
    rulesTip() {
      return {
        tip_speed: this.prop.bladeMaterial === 'Metal' ? 0.9 : 0.8,
      };
    },
  },
  methods: {
    setMaxSpeed(v) {
      this.$store.dispatch('setMaxSpeed', v);
    },
    setCruiseAltitude(v) {
      this.$store.dispatch('setCruiseAltitude', v);
    },
    setDiameter(v) {
      this.$store.dispatch('setDiameter', v);
    },
    setAngle(v) {
      this.$store.dispatch('setAngle', v);
    },
    update() {
      this.$store.dispatch('postPropData', {
        max_speed: this.prop.maxSpeed,
        sound_speed: this.soundSpeed,
        prop_speed: this.propSpeed,
        Cn: this.Cn,
      });
    },
    rulesAltitude() {
      return {
        required: true,
        min_value: 0,
        max_value: this.engine.maxAltitude,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-range {
  border: none;
  margin-left: -10px;
}

.custom-range + .input-group-append {
  margin-left: 0;
}
</style>
