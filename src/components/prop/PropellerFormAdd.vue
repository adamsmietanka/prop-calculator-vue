<template>
  <div class="mt-2">
    <b-form-group label="Blade material">
      <b-form-radio-group v-model="bladeMaterial" :options="['Metal', 'Composite', 'Wood']"/>
    </b-form-group>
    <DisabledInput name="Tip Mach Number"
                   :model="tipMach" :rules="rulesTip"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DisabledInput from '../DisabledInput.vue';

export default {
  name: 'PropellerFormAdd',
  components: { DisabledInput },
  computed: {
    ...mapState({
      prop: (state) => state.prop.form,
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
};
</script>
