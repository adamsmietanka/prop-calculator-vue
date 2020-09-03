<template>
  <b-container class="mt-2">
    <h2>What is this?</h2>
    <p>This is an optimisation tool for choosing the right powertrain for your aircraft</p>
    <h2>How does it work?</h2>
    <p>
      The model is based on the
      <a href="http://naca.central.cranfield.ac.uk/reports/1938/naca-report-640.pdf" target="_blank">NACA 640</a> and
      <a href="http://naca.central.cranfield.ac.uk/reports/1939/naca-report-650.pdf" target="_blank">650</a> reports.
      The data was extrapolated to a greater range of angles and meshed using SciPy.
    </p>
    <h2>How do I start?</h2>
    <p>1. Start by calculating maximum engine performance in the <b>Engine</b> tab</p>
    <p>2. In the <b>Propeller</b> tab you can choose the right prop for your engine</p>
    <p>3. The outcome of the calculations can be viewed in the <b>Results</b> tab</p>
    <footer class="pt-4 my-md-3 pt-md-3 border-top">
      <div class="row">
        <div class="col-12 col-md">
          <small class="d-block mb-3 text-muted">© 2020</small>
        </div>
        <div class="col-6 col-md">
          <h5>Contact</h5>
          <ul class="list-unstyled text-small">
            <li><a class="text-muted" href="https://github.com/adamsmietanka/prop-calculator/tree/frontend-heroku" target="_blank">GitHub</a></li>
            <li><a class="text-muted" href="https://www.linkedin.com/in/adam-smietanka/" target="_blank">LinkedIn</a></li>
          </ul>
        </div>
        <div class="col-6 col-md">
          <h5>Tools</h5>
          <ul class="list-unstyled text-small">
            <li><a class="text-muted" href="https://vuejs.org/" target="_blank">Vue.js</a></li>
            <li><a class="text-muted" href="https://flask.palletsprojects.com/en/1.1.x/" target="_blank">Flask</a></li>
          </ul>
        </div>
      </div>
    </footer>
  </b-container>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 20%;
  width: 60%;
  text-align: center;
}
</style>
