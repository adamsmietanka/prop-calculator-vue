<template>
  <div class="mt-2" id="custom">
    <b-table
      head-variant="light"
      hover
      bordered
      sticky-header="835px"
      :items="results.table"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ResultsTable",
  computed: {
    ...mapState({ results: (state) => state.results }),
  },
};
</script>
