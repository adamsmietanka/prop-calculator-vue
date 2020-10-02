<template>
  <b-form-group :label="name" :label-cols="cols" :label-size="size">
    <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }" ref="input">
      <b-input-group :size="size" :append="unit">
        <b-form-input type="number"
                      :step="stepSize"
                      :size="size"
                      v-model="value"
                      aria-describedby="error"/>
      </b-input-group>
      <b-form-invalid-feedback id="error">{{ errors[0] }}</b-form-invalid-feedback>
    </ValidationProvider>
  </b-form-group>
</template>

<script>
export default {
  name: 'NumberInput',
  props: {
    name: {
      required: true,
    },
    number: {
      required: true,
    },
    rules: {
      required: true,
    },
    setter: {
      required: true,
    },
    unit: {
      required: true,
    },
    step: {
      required: false,
      default: () => 1,
    },
    size: {
      required: false,
      default: () => 'md',
    },
    cols: {
      required: false,
      default: () => 0,
    },
  },
  computed: {
    stepSize() {
      return parseFloat(this.value) >= 400 ? 10 : this.step;
    },
  },
  data() {
    return {
      value: this.number,
    };
  },
  watch: {
    value(val) {
      this.$refs.input.validate()
        .then((res) => {
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
