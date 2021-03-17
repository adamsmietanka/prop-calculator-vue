<template>
  <div>
    <NumberInput name="Altitude"
                 :number="results.altitude"
                 step="0.1"
                 :rules="rulesAltitude()"
                 :setter="setAltitude"
                 unit="km"/>
    <NumberInput name="Angle" v-if="prop.bladePitch === 'Fixed'"
                 :number="prop.angle"
                 :rules="rulesAngle()"
                 :setter="setAngle"
                 unit="°"/>
    <b-form-group label="Step size" v-if="prop.bladePitch === 'Variable'">
      <b-form-radio-group stacked v-model="stepSize" :options="['2.5', '5', '10', '20']"/>
    </b-form-group>
    <DisabledInput name="Power"
                   :model="results.power"
                   unit="kW" />
    <DisabledInput name="Cp"
                   :model="Cp" />
    <b-button block variant="primary" @click="update" class="mt-2">Update</b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NumberInput from '../NumberInput.vue';
import DisabledInput from '../DisabledInput.vue';

export default {
  name: 'ResultsForm',
  components: {
    NumberInput,
    DisabledInput,
  },
  created() {
    this.update();
  },
  computed: {
    ...mapState({
      engine: (state) => state.engine,
      prop: (state) => state.prop.form,
      results: (state) => state.results.form,
      table: (state) => state.results.table,
    }),
    stepSize: {
      get() { return this.results.stepSize; },
      set(v) { this.$store.dispatch('setStepSize', v); },
    },
    Cp() {
      const { altitude, power } = this.results;
      const rho = 1.2255 * (1 - (altitude / 44.3)) ** 4.256;
      const Cp = (power * 1000) / (rho * this.propSpeed ** 3 * this.prop.diameter ** 5);
      return parseFloat(Cp.toFixed(4));
    },
    propSpeed() {
      return (this.engine.revs / 60) * this.engine.ratio;
    },
  },
  methods: {
    setAltitude(v) {
      this.$store.dispatch('setAltitude', v);
    },
    rulesAltitude() {
      return {
        required: true,
        min_value: 0,
        max_value: this.engine.maxAltitude,
      };
    },
    rulesAngle() {
      return {
        required: true,
        min_value: 10,
        prop_angle: this.table[1].J === 0 ? this.table[1].Angle + 1 : 10,
        max_value: 60,
      };
    },
    setAngle(v) {
      this.$store.dispatch('setAngle', v);
    },
    update() {
      this.$store.dispatch('setPower', this.results.altitude);
      this.$store.dispatch('postData', {
        max_speed: this.prop.maxSpeed,
        step_size: this.results.stepSize,
        diameter: this.prop.diameter,
        blades: this.prop.numberOfBlades,
        cp: this.Cp,
        prop_speed: this.propSpeed,
        power: this.results.power,
        angle: this.prop.angle,
        ratio: this.engine.ratio,
        pitch: this.prop.bladePitch,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.invalid-feedback {
  display: block;
}
</style>
