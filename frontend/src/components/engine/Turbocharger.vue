<template>
  <b-form-group label-size="sm" label="Max altitude:">
    <b-input-group :append="turboAltUnits">
      <b-form-input type="range"
                    size="sm"
                    v-model="maxAltitude"
                    min="6" max="8"
                    step="0.2"/>
    </b-input-group>
  </b-form-group>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Turbocharger',
  computed: {
    ...mapState({ engine: (state) => state.engine }),
    ...mapGetters(['turboAltUnits']),
    maxAltitude: {
      get() { return this.engine.turbocharger.altitude; },
      set(v) { this.$store.dispatch('setTurboAlt', v); },
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
  margin-left: 0px;
}
</style>
