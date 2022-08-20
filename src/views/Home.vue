<template>
  <section>
    <div>
      <h2>What is this?</h2>
      <p>
        This is an optimisation tool for choosing the right powertrain for your
        aircraft
      </p>
      <h2>How does it work?</h2>
      <p>
        The model is based on the
        <a
          class="link"
          href="http://naca.central.cranfield.ac.uk/reports/1938/naca-report-640.pdf"
          target="_blank"
          rel="noopener"
          >NACA 640</a
        >
        and
        <a
          class="link"
          href="http://naca.central.cranfield.ac.uk/reports/1939/naca-report-650.pdf"
          target="_blank"
          rel="noopener"
          >650</a
        >
        reports. The data was extrapolated to a greater range of angles and
        meshed using SciPy.
      </p>
      <h2>How do I start?</h2>
      <p>
        1. Start by calculating maximum engine performance in the
        <b>Engine</b> tab
      </p>
      <p>
        2. In the <b>Propeller</b> tab you can choose the right prop for your
        engine
      </p>
      <p>
        3. The outcome of the calculations can be viewed in the
        <b>Results</b> tab
      </p>
      <h5 style="margin-top: 4rem; color: green" v-show="heroku">
        There is a new, faster version of this app available at
        <a
          class="link"
          href="https://propcalculator.xyz"
          target="_blank"
          rel="noopener"
          >propcalculator.xyz</a
        >
      </h5>
    </div>
    <footer>
      <div class="text">Propeller Calculator</div>
      <div class="text">Adam Śmietanka © 2020</div>
      <div class="social">
        <a
          href="https://github.com/adamsmietanka/prop-calculator-vue"
          target="_blank"
          class="fab fa-github icon"
          aria-label="GitHub"
          rel="noopener"
        ></a>
        <a
          href="https://www.linkedin.com/in/adam-smietanka/"
          target="_blank"
          class="fab fa-linkedin icon"
          aria-label="LinkedIn"
          rel="noopener"
        ></a>
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      heroku: window.location.origin.includes("heroku"),
    };
  },
};
</script>

<style scoped>
footer {
  padding: 1rem 10rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 5rem;
  padding: 2rem;
}

.icon {
  color: black;
  font-size: 1.5rem;
}

.social {
  width: 4.5rem;
  display: flex;
  justify-content: space-between;
}

.link {
  color: black;
  font-weight: 500;
}

@media screen and (max-width: 960px) {
  footer {
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
  }

  section {
    padding: 1rem;
    margin-left: 0;
    padding-top: 4rem;
  }
}
</style>
