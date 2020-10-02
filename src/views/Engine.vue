<template>
  <b-container class="mt-3">
    <b-row>
      <b-col md="4">
        <EngineForm/>
      </b-col>
      <b-col md="8">
        <EnginePlot/>
        <EngineFormAdd/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import EngineForm from '../components/engine/EngineForm.vue';
import EngineFormAdd from '../components/engine/EngineFormAdd.vue';
import EnginePlot from '../components/engine/EnginePlot.vue';

export default {
  name: 'Engine',
  components: {
    EngineForm,
    EngineFormAdd,
    EnginePlot,
  },
};
</script>

.form-group {
    margin-bottom: 1rem;
}
<style lang="scss">
.form-group {
    margin-bottom: 0.5rem;
}

.card-body {
  padding: 0.75rem 1rem;
}
</style>
