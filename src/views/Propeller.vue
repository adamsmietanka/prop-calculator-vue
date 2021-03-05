<template>
  <b-container class="mt-3">
    <b-row>
      <b-col md="4">
        <PropellerForm/>
      </b-col>
      <b-col md="4">
        <PropellerTable/>
        <PropellerFormAdd/>
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
import PropellerFormAdd from '../components/prop/PropellerFormAdd.vue';
import PropellerTable from '../components/prop/PropellerTable.vue';

export default {
  name: 'Propeller',
  components: {
    PropellerForm,
    PropellerFormAdd,
    PropellerTable,
  },
  computed: {
    ...mapState({ prop: (state) => state.prop }),
    data() { return this.prop.chart.data; },
    layout() { return this.prop.chart.layout; },
  },
  mounted() {
    Plotly.plot('prop', this.data, this.layout, { displayModeBar: false });
  },
  watch: {
    data() {
      Plotly.react(
        'prop',
        this.data,
        this.layout,
      );
    },
  },
};
</script>
