<template>
  <div class="engine-form mt-2">
    <b-form-group label="SL Power">
      <ValidationProvider name="SL Power"
                          rules="required|min_value:100|max_value:10000" v-slot="{ errors, valid }">
        <b-input-group append="kW">
          <b-form-input type="number"
                        v-model="SLPower"
                        @keyup="valid && setSLPower($event)"
                        @click="valid && setSLPower($event)"
                        :state="valid ? null : false"
                        aria-describedby="error"/>
        </b-input-group>
        <b-form-invalid-feedback id="error">{{ errors[0] }}</b-form-invalid-feedback>
      </ValidationProvider>
    </b-form-group>
    <b-form-group label="K coefficient">
      <b-input-group :append="form.k">
        <b-form-input type="range" v-model="kCoefficient" min="0.08" max="0.25" step="0.01"/>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Max altitude">
      <b-input-group :append="maxAltUnits">
        <b-form-input type="range" v-model="maxAltitude" min="10" max="15"/>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Engine type">
      <b-form-radio-group v-model="engineType" stacked >
        <b-form-radio value="piston">Piston</b-form-radio>
        <b-form-radio value="turbine">Turbine</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
    <b-form-group label="Supercharger" v-show="engineType === 'piston'">
      <b-card bg-variant="light" class="mb-2">
        <b-form-group label="Stage 1"/>
        <b-form-group label-cols="4" label-size="sm" label="Start altitude:" >
          <ValidationProvider rules="required|min_value:0|max_value:10" v-slot="{ errors, valid }">
            <b-input-group size="sm" append="km">
              <b-form-input type="number"
                            fieldName=""
                            size="sm"
                            v-model="SLPower"
                            @keyup="valid && setSLPower($event)"
                            @click="valid && setSLPower($event)"
                            :state="valid && null"
                            aria-describedby="error"/>
            </b-input-group>
            <b-form-invalid-feedback id="error">{{ errors[0] }}</b-form-invalid-feedback>
          </ValidationProvider>
        </b-form-group>
        <b-form-group label-cols="4" label-size="sm" label="End altitude:" >
          <ValidationProvider rules="required|min_value:0|max_value:10" v-slot="{ errors, valid }">
            <b-input-group size="sm" append="km">
              <b-form-input type="number"
                            fieldName=""
                            size="sm"
                            v-model="SLPower"
                            @keyup="valid && setSLPower($event)"
                            @click="valid && setSLPower($event)"
                            :state="valid && null"
                            aria-describedby="error"/>
            </b-input-group>
            <b-form-invalid-feedback id="error">{{ errors[0] }}</b-form-invalid-feedback>
          </ValidationProvider>
        </b-form-group>
      </b-card>
      <b-button pill v-if="stages < 3" variant="secondary" @click="addStage">Add stage</b-button>
      <b-button pill v-if="stages > 0" variant="danger" @click="removeStage">Remove stage</b-button>
    </b-form-group>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'EngineForm',
  data() {
    return {
      SLPower: 100,
      supercharger: [
        {
          startAlt: 0,
          endAlt: 3,
          endPwr: 150,
        },
      ],
    };
  },
  created() {
    this.SLPower = this.form.SLPower;
  },
  computed: {
    ...mapState({ form: (state) => state.engine.form }),
    ...mapGetters(['maxAltUnits', 'stages']),
    kCoefficient: {
      get() { return this.form.k; },
      set(v) { this.$store.dispatch('setK', v); },
    },
    maxAltitude: {
      get() { return this.form.maxAltitude; },
      set(v) { this.$store.dispatch('setMaxAlt', v); },
    },
    engineType: {
      get() { return this.form.engineType; },
      set(v) { this.$store.dispatch('setEngineType', v); },
    },
  },
  methods: {
    setSLPower(e) {
      this.$store.dispatch('setSLPower', e.target.value);
    },
    addStage() {
      this.form.supercharger.push({
        startAlt: 0,
        endAlt: 3,
        endPwr: 150,
      });
    },
    removeStage() { this.form.supercharger.pop(); },
  },
};
</script>

<style lang="scss">
.input-group > .custom-range {
  border: none;
  margin-left: -10px;
}

.input-group-append {
  margin-left: 0px;
}

.invalid-feedback {
  display: block;
}

button {
  margin-right: 10px;
}
</style>
