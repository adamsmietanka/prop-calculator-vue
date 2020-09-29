<template>
  <div class="mt-2">
    <b-table striped hover bordered sticky-header="850px"
             :items="results.table"
             @row-hovered="rowHovered"
             @row-unhovered="rowUnhovered"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ResultsTable',
  computed: {
    ...mapState({ results: (state) => state.results }),
  },
  data() {
    return {
      timeoutOn: null,
      timeoutOff: null,
    };
  },
  methods: {
    rowHovered(item, index) {
      if (this.timeoutOn !== null) {
        clearTimeout(this.timeoutOn);
      }

      this.timeoutOn = setTimeout(() => {
        const color = Array(this.results.table.length).fill('#0275d8');
        color[index] = 'aliceblue';
        this.$store.dispatch('setHovered', color);
      }, 100);
    },
    rowUnhovered() {
      if (this.timeoutOff !== null) {
        clearTimeout(this.timeoutOff);
      }

      this.timeoutOff = setTimeout(() => {
        const color = Array(this.results.table.length).fill('#0275d8');
        this.$store.dispatch('setHovered', color);
      }, 100);
    },
  },
};
</script>
