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
      const x = [...Array(76).keys()].map((i) => i * 0.2);
      for (const { startAlt, endAlt } of this.form.supercharger) {
        x.push(startAlt, endAlt);
      }
      return x.sort((a, b) => a - b);
    },
    y() {
      return this.x().map((x) => this.calculatePower(x).toPrecision(4));
    },
    calculatePower(x) {
      let altitude = 0;
      let power = this.form.SLPower;
      if (this.form.engineType === 'piston') {
        if (this.form.turbocharger.enabled) {
          return x <= this.form.turbocharger.altitude
            ? this.form.SLPower
            : this.curvePower(this.form.turbocharger.altitude, this.form.SLPower, x);
        }
        for (const stage of this.form.supercharger) {
          if (x <= stage.startAlt) {
            return this.curvePower(altitude, power, x);
          }
          if (x <= stage.endAlt) {
            return this.linePower(stage, x);
          }
          altitude = stage.endAlt;
          power = stage.endPower;
        }
        return this.curvePower(altitude, power, x);
      }
      return power * (1 - x / 44.3) ** 2.5536;
    },
    curvePower(curveStart, curveStartPower, x) {
      // International Standard atmosphere
      const sigma = ((44.3 - x) / (44.3 - curveStart)) ** 4.256;
      return curveStartPower * ((sigma - this.form.k) / (1 - this.form.k));
    },
    linePower: (stage, x) => {
      const { startAlt, startPower, endAlt, endPower } = stage;
      const a = (endPower - startPower) / (endAlt - startAlt);
      return startPower + a * (x - startAlt);
    },
  },
};
</script>
