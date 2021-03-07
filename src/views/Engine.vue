<template>
  <b-container class="content">
    <b-row>
      <b-col md="8" order-lg="2">
        <EnginePlot/>
      </b-col>
      <b-col md="4" order-lg="1">
        <EngineForm/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import EngineForm from '../components/engine/EngineForm.vue';
import EnginePlot from '../components/engine/EnginePlot.vue';

export default {
  name: 'Engine',
  components: {
    EngineForm,
    EnginePlot,
  },
};
</script>

<style lang="scss">
.form-group {
    margin-bottom: 0.45rem;
}

.card-body {
  padding: 0.5rem 1rem;
}
</style>

<style scoped>
.content {
  margin-top: 0.5rem;
  width: 100%;
}

@media screen and (max-width: 960px) {
  .content {
    margin-top: 4rem;
  }
}
</style>
