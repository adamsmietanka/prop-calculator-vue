<template>
  <b-container class="mt-2">
    <h2>What is this?</h2>
    <p>This is an optimisation tool for choosing the right powertrain for your aircraft</p>
    <h2>How do I start?</h2>
    <p>1. Start by calculating maximum engine performance in the <b>Engine</b> tab</p>
    <p>2. In <b>Propeller</b> tab you can choose the right prop for your engine</p>
    <p>3. The outcome of the calculations can be viewed in the <b>Results</b> tab</p>
  </b-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      name: '',
    };
  },
  computed: {
    showAlert() {
      return this.name.length > 4;
    },
  },
};
</script>

<style scoped>
</style>
