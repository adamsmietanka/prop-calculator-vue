<template>
  <b-container>
    <b-row>
      <b-col md="2">
        <ResultsForm/>
      </b-col>
      <b-col md="6">
        <ResultsTable/>
      </b-col>
      <b-col md="4">
        <Plotly :data="results.charts.cp.data" class="my-3"
                :layout="layout('Power Coefficient')"
                :display-mode-bar="false"/>
        <Plotly :data="results.charts.eff.data" class="my-3"
                :layout="layout('Efficiency')"
                :display-mode-bar="false"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
import { Plotly } from 'vue-plotly';
import ResultsForm from '../components/results/ResultsForm.vue';
import ResultsTable from '../components/results/ResultsTable.vue';

export default {
  name: 'Results',
  components: {
    ResultsTable,
    ResultsForm,
    Plotly,
  },
  computed: {
    ...mapState({
      results: (state) => state.results,
      engine: (state) => state.engine,
    }),
  },
  methods: {
    layout(title) {
      return {
        title,
        height: 400,
        width: 500,
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 30,
          pad: 0,
        },
        xaxis: {
          title: 'J',
        },
        scene: {
          camera: {
            eye: {
              x: 1,
              y: -1,
              z: 1,
            },
          },
        },
      };
    },
  },
};
</script>
