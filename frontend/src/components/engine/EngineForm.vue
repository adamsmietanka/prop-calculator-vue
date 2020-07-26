<template>
  <div class="engine-form">
    <FormulateForm
    >
      <FormulateInput
        name="SLPower"
        label="SL Power"
        :value="form.SLPower"
        @change="setSLPower($event)"
        validation="required|number|min:0|max:10000"
      />
      <FormulateInput
        label="K coefficient"
        type="range"
        name="k"
        min="0.08"
        max="0.25"
        step="0.01"
        :value="form.k"
        @change="setK($event)"
        show-value="true"
        validation="required|min:0.08|max:0.25"
      />
      <FormulateInput
        label="Engine type"
        type="radio"
        name="engineType"
        :options="{
        piston: 'Piston',
        turbine: 'Turbine'}"
        validation="required"
      />
      <FormulateInput
        v-show="form.engineType === 'piston'"
        type="group"
        name="supercharger"
        :repeatable="true"
        limit="2"
        default="0"
        label="Supercharger"
        add-label="+ Add supercharger stage"
        validation="required"
      >
        <div class="supercharger">
          <FormulateInput
            name="startAlt"
            validation="required|number|min:0|max:10"
            label="Start altitude"
          />
          <FormulateInput
            name="endAlt"
            validation="required|number|min:0|max:10"
            label="End altitude"
          />
          <FormulateInput
            name="endPower"
            validation="required|number|min:0|max:10000"
            label="End power"
          />
        </div>
      </FormulateInput>
      <FormulateInput
        v-show="form.engineType === 'piston'"
        type="group"
        name="turbocharger"
        :repeatable="true"
        limit="1"
        label="Turbocharger"
        add-label="+ Add turbocharger"
        validation="required"
      >
        <div class="turbocharger">
          <FormulateInput
            name="turboAltitude"
            validation="required"
            label="Constant power altitude"
          />
        </div>
      </FormulateInput>
    </FormulateForm>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'EngineForm',
  computed: {
    ...mapState({ form: (state) => state.engine.form }),
  },
  methods: {
    setK(e) {
      this.$store.commit('SET_K', e.target.value);
    },
    setSLPower(e) {
      console.log(1);
      this.$store.commit('SET_SL_POWER', e.target.value);
    },
  },
};
</script>

<style lang="scss">
@import '../../../node_modules/@braid/vue-formulate/themes/snow/snow.scss';

.engine-form {
  padding: 1.5em;
  box-sizing: border-box;
}
@media (min-width: 650px) {
  .supercharger {
    display: flex;
  }
}

@media (min-width: 720px) {
  .supercharger {
    display: block;
  }
}

@media (min-width: 850px) {
  .supercharger {
    display: flex;
  }
  .supercharger .formulate-input {
    margin-right: 1.5em;
  }
}
.supercharger .formulate-input {
  margin-right: 1.5em;
  margin-bottom: 0;
}

  .formulate-input-group-add-more {
    border: none;
  }
</style>
