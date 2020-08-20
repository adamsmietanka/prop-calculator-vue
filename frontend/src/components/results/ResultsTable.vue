<template>
<div class="mt-2">
  <b-table striped hover bordered :items="items"></b-table>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ResultsTable',
  computed: {
    ...mapState({
      results: (state) => state.results,
    }),
    items: {
      get() {
        return this.results.table;
      },
    },
  },
};
</script>

<style scoped>

</style>
