<template>
  <b-form-group :label="name">
    <b-form-radio-group
      v-model="toggleInput"
      :options="['Optimized', 'Manual']"
      class="mb-2 ml-1"
    />
    <ValidationProvider
      :name="name"
      :rules="rules"
      v-slot="{ errors }"
      ref="input"
    >
      <b-input-group :append="unit" v-show="toggleInput === 'Optimized'">
        <b-form-input disabled type="number" v-model="model" />
      </b-input-group>
      <b-form-invalid-feedback id="error">{{
        errors[0]
      }}</b-form-invalid-feedback>
    </ValidationProvider>
    <ValidationProvider
      :name="name"
      :rules="rules"
      v-slot="{ errors }"
      ref="input"
      v-show="toggleInput === 'Manual'"
    >
      <b-input-group :append="unit">
        <b-form-input
          type="number"
          :step="step"
          v-model="value"
          aria-describedby="error"
        />
      </b-input-group>
      <b-form-invalid-feedback id="error">{{
        errors[0]
      }}</b-form-invalid-feedback>
    </ValidationProvider>
  </b-form-group>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ToggleableInput',
  props: {
    name: {
      required: true,
    },
    model: {
      required: true,
    },
    rules: {
      required: true,
    },
    setter: {
      required: true,
    },
    toggler: {
      required: true,
    },
    unit: {
      required: true,
    },
    step: {
      required: false,
      default: () => 1,
    },
  },
  computed: {
    ...mapState({
      prop: (state) => state.prop.form,
      table: (state) => state.prop.table,
    }),
    toggleInput: {
      get() {
        return this.toggler;
      },
      set(v) {
        this.$store.dispatch('setDiameterType', v);
        if (v === 'Manual') {
          this.value = this.model;
        }
      },
    },
  },
  data() {
    return {
      value: this.model,
    };
  },
  watch: {
    value(val) {
      this.$refs.input.validate().then((res) => {
        if (res.valid) {
          this.setter(val);
        }
      });
    },
  },
};
</script>

<style scoped>
.invalid-feedback {
  width: 100%;
  display: block;
}
</style>
