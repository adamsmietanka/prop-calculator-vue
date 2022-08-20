<template>
  <div id="engine" />
</template>

<script>
import { mapState } from "vuex";
import Plotly from "plotly.js-gl3d-dist-min";

export default {
  name: "EnginePlot",
  computed: {
    ...mapState({
      results: (state) => state.results,
      engine: (state) => state.engine,
    }),
    data() {
      return [this.engine.data];
    },
    layout() {
      return {
        title: "Engine performance",
        font: { size: 18 },
        height: window.innerWidth > 960 ? 600 : window.innerHeight * 0.5,
        width: window.innerWidth > 960 ? 600 : window.innerWidth * 0.9,
        margin: {
          l: 65,
          r: 10,
          b: 100,
          t: 100,
          pad: 4,
        },
        yaxis: {
          range: [0, Math.max(...this.engine.data.y) * 1.01],
          title: {
            text: "Engine Power [kW]",
            font: { size: 16 },
          },
        },
        xaxis: {
          range: [0, this.engine.maxAltitude],
          title: {
            text: "Altitude [km]",
            font: { size: 16 },
          },
        },
        dragmode: false,
      };
    },
    options() {
      return {
        scrollZoom: false,
        responsive: true,
        modeBarButtons: [["toImage"]],
        toImageButtonOptions: {
          format: "png",
          filename: "engine_power",
        },
      };
    },
  },
  mounted() {
    Plotly.plot("engine", this.data, this.layout, this.options);
  },
  watch: {
    data() {
      Plotly.react("engine", this.data, this.layout, this.options);
    },
    layout() {
      Plotly.react("engine", this.data, this.layout, this.options);
    },
  },
  created() {
    this.$store.dispatch("updateData");
  },
};
</script>
<style scoped>
@media screen and (max-width: 960px) {
  #engine {
    margin-left: -1rem;
  }
}
</style>
