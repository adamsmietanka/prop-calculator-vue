<template>
  <div class="engine-form mt-2">
    <b-form-group label="SL Power">
      <ValidationProvider name="SL Power"
                          rules="required|between:100,10000" v-slot="{ errors, valid }">
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
    <b-form-group label="Max altitude">
      <b-input-group :append="maxAltUnits">
        <b-form-input type="range" v-model="maxAltitude" min="10" max="15"/>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Engine type">
      <b-form-radio-group v-model="engineType" >
        <b-form-radio value="piston">Piston</b-form-radio>
        <b-form-radio value="turbine">Turbine</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
    <b-form-group label="K coefficient" v-show="engineType === 'piston'">
      <b-input-group :append="form.k.toString()">
        <b-form-input type="range" v-model="kCoefficient" min="0.08" max="0.25" step="0.01"/>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Supercharger" v-show="engineType === 'piston'">
      <SuperchargerStage v-for="(stage, index) in this.form.supercharger"
                         :key="stage.id"
                         :index="index"/>
      <b-button pill :disabled="form.turbocharger.enabled || !this.anotherStageFits"
                @click="addStage" >Add stage</b-button>
      <b-button pill :disabled="stages === 0" variant="danger"
                @click="removeStage">Remove stage</b-button>
    </b-form-group>
    <b-form-group label="Turbocharger" v-show="engineType === 'piston'">
      <b-button pill :disabled="stages > 0" :pressed.sync="turbo" v-model="turbo" variant="primary">
        {{ turbo ? 'Remove' : 'Add' }}
      </b-button>
      <Turbocharger v-show="turbo"/>
    </b-form-group>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SuperchargerStage from './SuperchargerStage.vue';
import Turbocharger from './Turbocharger.vue';

export default {
  name: 'EngineForm',
  components: {
    SuperchargerStage,
    Turbocharger,
  },
  data() {
    return {
      SLPower: 100,
    };
  },
  created() {
    this.SLPower = this.form.SLPower;
  },
  computed: {
    ...mapState({ form: (state) => state.engine.form }),
    ...mapGetters(['maxAltUnits', 'stages', 'lastStage']),
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
    anotherStageFits() {
      return !this.stages || this.lastStage.endAlt < this.maxAltitude - 3;
    },
    turbo: {
      get() { return this.form.turbocharger.enabled; },
      set(v) { this.$store.dispatch('toggleTurbo', v); },
    },
  },
  methods: {
    setSLPower(e) {
      this.$store.dispatch('setSLPower', e.target.value);
    },
    addStage() {
      this.$store.dispatch('addStage', this.stageData());
    },
    stageData() {
      if (this.stages === 0) {
        return {
          id: 0,
          startAlt: 0,
          endAlt: 3,
          endPower: this.form.SLPower * 1.5,
        };
      }
      return {
        id: this.lastStage.id + 1,
        startAlt: this.lastStage.endAlt + 1,
        endAlt: this.lastStage.endAlt + 3,
        endPower: this.form.SLPower * 1.35,
      };
    },
    removeStage() {
      this.$store.dispatch('removeStage');
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
