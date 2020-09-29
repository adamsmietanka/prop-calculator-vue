<template>
  <div :ref="id"></div>
</template>

<script>
import { mapState } from 'vuex';
import Plotly from 'plotly.js-dist';

export default {
  name: 'Plot3D',
  props: ['id'],
  computed: {
    ...mapState({ results: (state) => state.results }),
    color() { return this.results.hovered.color; },
    data() { return this.results.charts[this.id].data; },
  },
  mounted() {
    Plotly.plot(this.$refs[this.id], this.data, this.layout, { displayModeBar: false });
  },
  watch: {
    data() {
      Plotly.react(
        this.$refs[this.id],
        this.data,
        this.layout,
      );
    },
    color() {
      Plotly.animate(this.$refs[this.id], {
        data: [{ 'marker.color': this.color }],
        traces: [1],
      }, {
        transition: {
          duration: 0,
        },
        frame: {
          duration: 0,
        },
      });
    },
  },
  data() {
    return {
      layout: {
        height: 400,
        width: 500,
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
