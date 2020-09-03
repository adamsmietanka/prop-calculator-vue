<template>
  <div class="mt-2">
    <DisabledInput name="Diameter" v-if="prop.diameterType === 'Optimized'"
                   :model="prop.diameter"
                   unit="m" />
    <NumberInput name="Diameter" v-if="prop.diameterType === 'Manual'"
                 :number="prop.diameter"
                 step="0.01"
                 rules="required|between:0.5,5"
                 :setter="setDiameter"
                 unit="m"/>
    <b-form-group label="Blade material">
      <b-form-radio-group v-model="bladeMaterial" :options="['Metal', 'Wood']"/>
    </b-form-group>
    <DisabledInput name="Tip Mach Number"
                   :model="tipMach"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NumberInput from '../NumberInput.vue';
import DisabledInput from '../DisabledInput.vue';

export default {
  name: 'PropellerFormAdd',
  components: {
    NumberInput,
    DisabledInput,
  },
  computed: {
    ...mapState({
      prop: (state) => state.prop.form,
      table: (state) => state.prop.table,
      engine: (state) => state.engine,
    }),
    bladeMaterial: {
      get() { return this.prop.bladeMaterial; },
      set(v) { this.$store.dispatch('setBladeMaterial', v); },
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
      const rotationSpeed = Math.PI * this.propSpeed * this.prop.diameter;
      const forwardSpeed = 1.2 * this.prop.maxSpeed;
      const a = Math.hypot(forwardSpeed, rotationSpeed) / this.soundSpeed;
      return parseFloat(a.toFixed(3));
    },
  },
  methods: {
    setMaxSpeed(v) {
      this.$store.dispatch('setMaxSpeed', v);
      this.update();
    },
    setCruiseAltitude(v) {
      this.$store.dispatch('setCruiseAltitude', v);
    },
    setDiameter(v) {
      this.$store.dispatch('setDiameter', v);
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
