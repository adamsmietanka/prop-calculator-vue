<template>
  <b-row class="mt-2">
    <b-col md="6">
      <b-form-group label="Max altitude">
        <b-input-group :append="maxAltUnits">
          <b-form-input type="range" v-model="maxAltitude" min="10" max="15"/>
        </b-input-group>
      </b-form-group>
    </b-col>
    <b-col md="6">
    <NumberInput name="Reduction ratio"
                 :number="engine.ratio"
                 rules="required|between:0,1"
                 :setter="setRatio"
                 unit=":1"
                 step="0.01"/>
    <NumberInput name="Engine speed"
                 :number="engine.revs"
                 rules="required|between:2000,7000"
                 :setter="setRevs"
                 unit="rpm"
                 step="100"/>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import NumberInput from '../NumberInput.vue';

export default {
  name: 'EngineFormAdd',
  components: {
    NumberInput,
  },
  computed: {
    ...mapState({ engine: (state) => state.engine }),
    ...mapGetters(['maxAltUnits']),
    kCoefficient: {
      get() { return this.engine.k; },
      set(v) { this.$store.dispatch('setK', v); },
    },
    maxAltitude: {
      get() { return this.engine.maxAltitude; },
      set(v) { this.$store.dispatch('setMaxAlt', v); },
    },
  },
  methods: {
    setRatio(v) {
      this.$store.dispatch('setRatio', v);
    },
    setRevs(v) {
      this.$store.dispatch('setRevs', v);
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

.invalid-feedback {
  display: block;
}

button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
