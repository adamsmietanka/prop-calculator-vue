<template>
  <b-card bg-variant="light" class="mb-2">
    <b-form-group label-size="sm" label="End altitude" label-cols="4" class="mb-0">
      <b-input-group size="sm" :append="turboAltUnits">
        <b-form-input type="range"
                      size="sm"
                      v-model="maxAltitude"
                      min="6" max="8"
                      step="0.2"/>
      </b-input-group>
    </b-form-group>
  </b-card>
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
  background: #f7f7f7;
}

.custom-range + .input-group-append {
  margin-left: 0;
}
</style>
