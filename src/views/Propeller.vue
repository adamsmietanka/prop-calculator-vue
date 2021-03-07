<template>
  <b-container class="content">
    <b-row>
      <b-col md="4">
        <PropellerForm />
      </b-col>
      <b-col md="4">
        <PropellerTable />
      </b-col>
      <b-col md="4">
        <div id="prop" />
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
      return this.prop.chart.data;
    },
    layout() {
      return {
        title: 'Maximum Efficiency Curves',
        font: { size: 12 },
        margin: {
          l: 50,
          r: 0,
          b: 100,
          t: 50,
          pad: 4,
        },
        yaxis: {
          autorange: true,
          title: {
            text: 'Advance Ratio [J]',
            font: { size: 16 },
          },
        },
        xaxis: {
          autorange: true,
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
