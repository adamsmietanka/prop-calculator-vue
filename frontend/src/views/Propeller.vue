<template>
  <b-container>
    <b-row>
      <b-col md="4">
        <PropellerForm/>
      </b-col>
      <b-col md="4">
        <PropellerTable/>
        <PropellerFormAdd/>
      </b-col>
      <b-col md="4">
        <Plotly :data="prop.chart.data"
                :layout="prop.chart.layout"
                :display-mode-bar="false"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
import { Plotly } from 'vue-plotly';
import PropellerForm from '../components/prop/PropellerForm.vue';
import PropellerFormAdd from '../components/prop/PropellerFormAdd.vue';
import PropellerTable from '../components/prop/PropellerTable.vue';

export default {
  name: 'Propeller',
  components: {
    PropellerForm,
    PropellerFormAdd,
    PropellerTable,
    Plotly,
  },
  computed: {
    ...mapState({ prop: (state) => state.prop }),
  },
};
</script>
