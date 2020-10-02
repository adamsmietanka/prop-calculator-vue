<template>
  <div class="engine-form">
    <NumberInput name="SL Power"
                 :number="engine.SLPower"
                 rules="required|between:100,10000"
                 :setter="setSLPower"
                 unit="kW"/>
    <b-form-group label="Max altitude">
      <b-input-group :append="maxAltUnits">
        <b-form-input type="range" v-model="maxAltitude" min="10" max="15"/>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Engine type">
      <b-form-radio-group v-model="engineType" :options="['Piston', 'Turbine']"/>
    </b-form-group>
    <b-form-group label="K coefficient" v-show="engineType === 'Piston'">
      <b-input-group :append="k">
        <b-form-input type="range"
                      v-model="kCoefficient"
                      min="0.08"
                      max="0.25"
                      step="0.01"/>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Supercharger" v-show="engineType === 'Piston'">
      <SuperchargerForm v-for="(stage, index) in this.engine.supercharger"
                         :key="stage.id"
                         :index="index"/>
      <b-button :disabled="stages === 2"
                variant="primary"
                @click="addStage" >
        {{ stages ? 'Add Speed' : 'Add Stage' }}
      </b-button>
      <b-button :disabled="stages === 0"
                variant="danger"
                @click="removeStage">
        {{ stages ? 'Remove Speed' : 'Remove Stage' }}
      </b-button>
    </b-form-group>
    <b-form-group label="Turbocharger" v-show="engineType === 'Piston'">
      <Turbocharger v-show="turbo"/>
      <b-button :pressed.sync="turbo" v-model="turbo" variant="primary">
        {{ turbo ? 'Remove' : 'Add' }}
      </b-button>
    </b-form-group>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SuperchargerForm from './SuperchargerForm.vue';
import Turbocharger from './Turbocharger.vue';
import NumberInput from '../NumberInput.vue';

export default {
  name: 'EngineForm',
  components: {
    SuperchargerForm,
    Turbocharger,
    NumberInput,
  },
  computed: {
    ...mapState({ engine: (state) => state.engine }),
    ...mapGetters(['stages', 'lastStage', 'maxAltUnits', 'k']),
    maxAltitude: {
      get() { return this.engine.maxAltitude; },
      set(v) { this.$store.dispatch('setMaxAlt', v); },
    },
    kCoefficient: {
      get() { return this.engine.k; },
      set(v) { this.$store.dispatch('setK', v); },
    },
    engineType: {
      get() { return this.engine.type; },
      set(v) { this.$store.dispatch('setEngineType', v); },
    },
    turbo: {
      get() { return this.engine.turbocharger.enabled; },
      set(v) { this.$store.dispatch('toggleTurbo', v); },
    },
  },
  methods: {
    setSLPower(v) {
      this.$store.dispatch('setSLPower', v);
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
          endPower: this.engine.SLPower * 1.25,
        };
      }
      return {
        id: this.lastStage.id + 1,
        startAlt: this.lastStage.endAlt + 2,
        endAlt: this.lastStage.endAlt + 5,
        endPower: Math.round(this.engine.SLPower * 1.2),
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
