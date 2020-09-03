<template>
  <b-container class="mt-2">
    <h2>What is this?</h2>
    <p>This is an optimisation tool for choosing the right powertrain for your aircraft</p>
    <h2>How does it work?</h2>
    <p>
      The model is based on the <a href="http://naca.central.cranfield.ac.uk/reports/1938/naca-report-640.pdf" target="_blank">NACA 640</a> and
      <a href="http://naca.central.cranfield.ac.uk/reports/1939/naca-report-650.pdf" target="_blank">650</a> reports.
      The data was extrapolated to a greater range of angles and meshed using SciPy.
    </p>
    <h2>How do I start?</h2>
    <p>1. Start by calculating maximum engine performance in the <b>Engine</b> tab</p>
    <p>2. In the <b>Propeller</b> tab you can choose the right prop for your engine</p>
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
