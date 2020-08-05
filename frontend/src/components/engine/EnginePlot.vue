<template>
<b-container class="bv-example-row">
  <VuePlotly :data="plotData" :layout="layout" :options="options"/>
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
    ...mapState({ form: (state) => state.engine.form }),
    plotData() {
      return [{ x: this.x(), y: this.y() }];
    },
    layout() {
      return {
        title: 'Engine performance',
        font: { size: 18 },
        yaxis: {
          range: [0, Math.max(...this.y()) * 1.1],
          title: {
            text: 'Engine Power [kW]',
            font: {
              size: 16,
            },
          },
        },
        xaxis: {
          range: [0, this.form.maxAltitude],
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
  },
  data() {
    return {
      options: { scrollZoom: false, responsive: true },
    };
  },
  methods: {
    x() {
      let x = [...Array(31).keys()].map((x) => x * 0.5);
      for (const { startAlt, endAlt } of this.form.supercharger)
        x.push(startAlt, endAlt);
      return x.sort((a, b) => a - b);
    },
    y() {
      return this.x().map((x) => this.calculatePower(x));
    },
    calculatePower(x) {
      let altitude = 0;
      let power = this.form.SLPower;
      for (const stage of this.form.supercharger) {
        if (x <= stage.startAlt)
          return this.curvePower(altitude, power, x);
        else if (x <= stage.endAlt)
          return this.linePower(stage, x);
        else {
          altitude = stage.endAlt;
          power = stage.endPower;
        }
      }
      return this.curvePower(altitude, power, x);
    },
    curvePower(curveStart, curveStartPower, x) {
      // International Standard atmosphere
      const sigma = ((44.3 - x) / (44.3 - curveStart)) ** 4.256;
      return curveStartPower * ((sigma - this.form.k) / (1 - this.form.k));
    },
    linePower({ startAlt, startPower, endAlt, endPower }, x) {
      const a = (endPower - startPower) / (endAlt - startAlt);
      return startPower + a * (x - startAlt);
    },
  },
};
</script>
