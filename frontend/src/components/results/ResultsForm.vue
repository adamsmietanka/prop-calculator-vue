<template>
  <div class="mt-2">
    <NumberInput name="Altitude"
                 :number="results.altitude"
                 step="0.1"
                 :rules="rulesAltitude()"
                 :setter="setAltitude"
                 unit="km"/>
    <b-form-group label="Step size">
      <b-form-radio-group v-model="stepSize" :options="['5', '10', '20']"/>
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
  computed: {
    ...mapState({
      engine: (state) => state.engine,
      prop: (state) => state.prop.form,
      results: (state) => state.results.form,
    }),
    stepSize: {
      get() { return this.results.stepSize; },
      set(v) { this.$store.dispatch('setStepSize', v); },
    },
    Cp() {
      const { altitude, power } = this.results;
      const rho = 1.2255 * (1 - (altitude / 44.3)) ** 4.256;
      const Cp = (power * 1000) / (rho * this.propSpeed ** 3 * this.prop.diameter ** 5);
      return parseFloat(Cp.toPrecision(4));
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
    update() {
      this.$store.dispatch('setPower', this.results.altitude);
      this.$store.dispatch('postData', {
        max_speed: this.prop.maxSpeed,
        step_size: this.results.stepSize,
        diameter: this.prop.diameter,
        blades: this.prop.numberOfBlades,
        Cp: this.Cp,
        prop_speed: this.propSpeed,
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
