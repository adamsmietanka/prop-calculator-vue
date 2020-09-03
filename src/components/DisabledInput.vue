<template>
  <b-form-group :label="name">
    <b-input-group :append="unit">
      <b-form-input disabled
                    v-model="model"
                    type="number" />
    </b-input-group>
  </b-form-group>
</template>

<script>
export default {
  name: 'DisabledInput',
  props: {
    name: {
      required: true,
    },
    model: {
      required: true,
    },
    unit: {
      required: false,
      default: () => '',
    },
  },
};
</script>
