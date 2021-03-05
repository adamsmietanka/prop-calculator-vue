<template>
  <b-container>
    <div id="engine" />
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
import Plotly from 'plotly.js-gl3d-dist-min';

export default {
  name: 'EnginePlot',
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
        title: 'Engine performance',
        font: { size: 18 },
        yaxis: {
          range: [0, Math.max(...this.engine.data.y) * 1.1],
          title: {
            text: 'Engine Power [kW]',
            font: { size: 16 },
          },
        },
        xaxis: {
          range: [0, this.engine.maxAltitude],
          title: {
            text: 'Altitude [km]',
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
        modeBarButtons: [['toImage']],
      };
    },
  },
  mounted() {
    Plotly.plot('engine', this.data, this.layout, this.options);
  },
  watch: {
    data() {
      Plotly.react('engine', this.data, this.layout, this.options);
    },
    layout() {
      Plotly.react('engine', this.data, this.layout, this.options);
    },
  },
  created() {
    this.$store.dispatch('updateData');
  },
};
</script>
