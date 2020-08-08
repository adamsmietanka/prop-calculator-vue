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
      <b-form-group label="Reduction ratio">
      <ValidationProvider name="Reduction ratio"
                          rules="required|between:0,1" v-slot="{ errors, valid }">
        <b-input-group append=":1">
          <b-form-input type="number"
                        step="0.01"
                        v-model="ratio"
                        @keyup="valid && setRatio($event)"
                        @click="valid && setRatio($event)"
                        :state="valid ? null : false"
                        aria-describedby="error"/>
        </b-input-group>
        <b-form-invalid-feedback id="error">{{ errors[0] }}</b-form-invalid-feedback>
      </ValidationProvider>
    </b-form-group>
    <b-form-group label="Engine speed">
      <ValidationProvider name="Engine speed"
                          rules="required|between:20,100" v-slot="{ errors, valid }">
        <b-input-group append="1/s">
          <b-form-input type="number"
                        v-model="revs"
                        @keyup="valid && setRevs($event)"
                        @click="valid && setRevs($event)"
                        :state="valid ? null : false"
                        aria-describedby="error"/>
        </b-input-group>
        <b-form-invalid-feedback id="error">{{ errors[0] }}</b-form-invalid-feedback>
      </ValidationProvider>
    </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'EngineFormAdd',
  data() {
    return {
      ratio: 100,
      revs: 50,
    };
  },
  created() {
    this.ratio = this.engine.ratio;
    this.revs = this.engine.revs;
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
    setRatio(e) {
      this.$store.dispatch('setRatio', e.target.value);
    },
    setRevs(e) {
      this.$store.dispatch('setRevs', e.target.value);
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

.invalid-feedback {
  display: block;
}

button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
