<template>
<b-container>
  <VuePlotly :data="[engine.data]" :layout="layout" :options="options"/>
</b-container>
</template>

<script>
import { mapState } from 'vuex';
import VuePlotly from '@statnett/vue-plotly';

export default {
  name: 'EnginePlot',
  components: {
    VuePlotly,
  },
  computed: {
    ...mapState({
      results: (state) => state.results,
      engine: (state) => state.engine,
    }),
    layout() {
      return {
        title: 'Engine performance',
        font: { size: 18 },
        yaxis: {
          range: [0, Math.max(...this.engine.data.y) * 1.1],
          title: {
            text: 'Engine Power [kW]',
            font: {
              size: 16,
            },
          },
        },
        xaxis: {
          range: [0, this.engine.maxAltitude],
          title: {
            text: 'Altitude [km]',
            font: {
              size: 16,
            },
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
  created() {
    this.$store.dispatch('updateData');
  },
};
</script>
