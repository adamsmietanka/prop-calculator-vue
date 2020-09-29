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
        <Plot3D id="cp"/>
        <Plot3D id="eff"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
import ResultsForm from '../components/results/ResultsForm.vue';
import ResultsTable from '../components/results/ResultsTable.vue';
import Plot3D from '../components/results/Plot3D.vue';

export default {
  name: 'Results',
  components: {
    ResultsTable,
    ResultsForm,
    Plot3D,
  },
  computed: {
    ...mapState({ results: (state) => state.results }),
  },
};
</script>
