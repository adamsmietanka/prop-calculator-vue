<template>
<b-container class="bv-example-row">
  <b-row>
    <b-col> {{form}}</b-col>
  </b-row>
</b-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'EnginePlot',
  computed: {
    ...mapState({ form: (state) => state.engine.form }),
  },
};
</script>

<style scoped>

</style>
