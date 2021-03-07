<template>
  <b-container class="content">
    <b-row>
      <b-col md="2" order-lg="1">
        <ResultsForm />
      </b-col>
      <b-col md="4" order-lg="3">
        <Plot3D class="my-3" id="cp" />
        <Plot3D class="mb-3" id="eff" />
      </b-col>
      <b-col md="6" order-lg="2">
        <ResultsTable />
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
