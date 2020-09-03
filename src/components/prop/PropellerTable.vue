<template>
<div class="mt-2">
  <b-table striped hover bordered :items="items"></b-table>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PropellerTable',
  computed: {
    ...mapState({
      prop: (state) => state.prop,
    }),
    items: {
      get() {
        return this.prop.table;
      },
    },
  },
};
</script>

<style scoped>

</style>
