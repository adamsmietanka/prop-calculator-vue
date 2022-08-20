<template>
  <b-form-group :label="name">
    <ValidationProvider
      :name="name"
      :rules="rules"
      v-slot="{ errors }"
      ref="input"
    >
      <b-input-group :append="unit">
        <b-form-input disabled :value="model" type="number" />
      </b-input-group>
      <b-form-invalid-feedback id="error">{{
        errors[0]
      }}</b-form-invalid-feedback>
    </ValidationProvider>
  </b-form-group>
</template>

<script>
export default {
  name: "DisabledInput",
  props: {
    name: {
      required: true,
    },
    model: {
      required: true,
    },
    unit: {
      required: false,
      default: () => "",
    },
    rules: {
      required: false,
      default: () => "",
    },
  },
  watch: {
    model() {
      this.$refs.input.validate();
    },
  },
  mounted() {
    this.$refs.input.validate();
  },
};
</script>

<style scoped>
.invalid-feedback {
  width: 100%;
  display: block;
}
</style>
