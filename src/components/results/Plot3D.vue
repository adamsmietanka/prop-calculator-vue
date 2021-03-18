<template>
  <div :ref="id"></div>
</template>

<script>
import { mapState } from 'vuex';
import Plotly from 'plotly.js-gl3d-dist-min';

export default {
  name: 'Plot3D',
  props: ['id'],
  computed: {
    ...mapState({ results: (state) => state.results }),
    data() {
      return this.results.charts[this.id];
    },
    options() {
      return {
        responsive: true,
        modeBarButtons: [['toImage']],
        toImageButtonOptions: {
          format: 'png',
          filename: `${this.id}_chart`,
        },
      };
    },
  },
  mounted() {
    Plotly.plot(this.$refs[this.id], this.data, this.layout, this.options);
  },
  watch: {
    data() {
      Plotly.react(this.$refs[this.id], this.data, this.layout, this.options);
    },
  },
  data() {
    return {
      layout: {
        height: window.innerWidth > 960 ? 400 : window.innerHeight * 0.35,
        width: window.innerWidth > 960 ? 500 : window.innerWidth * 0.9,
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0,
          pad: 0,
        },
        scene: {
          camera: {
            eye: {
              x: 1.4,
              y: -1.4,
              z: 0.4,
            },
            center: {
              x: -0.05,
              y: -0.05,
              z: -0.18,
            },
          },
          xaxis: {
            title: 'J',
          },
          yaxis: {
            title: 'Angle',
          },
          zaxis: {
            title: this.id === 'cp' ? 'Cp' : 'Eff',
          },
        },
      },
    };
  },
};
</script>
