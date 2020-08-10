<template>
  <b-container>
    <b-row>
      <b-col md="4">
        <ResultsForm/>
      </b-col>
      <b-col md="4">
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import ResultsForm from '@/components/results/ResultsForm.vue';

export default {
  name: 'Results',
  components: {
    ResultsForm,
  },
};
</script>
