<template>
  <b-container class="content">
    <b-row>
      <b-col md="4">
        <PropellerForm />
      </b-col>
      <b-col md="6">
        <div id="prop" />
        <PropellerTable />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
import Plotly from 'plotly.js-gl3d-dist-min';
import PropellerForm from '../components/prop/PropellerForm.vue';
import PropellerTable from '../components/prop/PropellerTable.vue';

export default {
  name: 'Propeller',
  components: {
    PropellerForm,
    PropellerTable,
  },
  computed: {
    ...mapState({ prop: (state) => state.prop }),
    data() {
      return this.prop.chart;
    },
    layout() {
      return {
        title: 'Maximum Efficiency Curves',
        font: { size: 14 },
        height: window.innerWidth > 960 ? 500 : window.innerHeight * 0.7,
        width: window.innerWidth > 960 ? 600 : window.innerWidth * 0.9,
        margin: {
          l: 65,
          r: 0,
          b: 100,
          t: 100,
          pad: 4,
        },
        yaxis: {
          title: {
            text: 'Advance Ratio [J]',
            font: { size: 16 },
          },
        },
        xaxis: {
          title: {
            text: 'Cn',
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
        displayModeBar: false,
      };
    },
  },
  mounted() {
    Plotly.plot('prop', this.data, this.layout, this.options);
  },
  watch: {
    data() {
      Plotly.react('prop', this.data, this.layout, this.options);
    },
  },
};
</script>
<style scoped>
.content {
  margin-top: 1rem;
}

@media screen and (max-width: 960px) {
  .content {
    margin-top: 4rem;
  }
}
</style>
