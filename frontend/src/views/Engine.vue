<template>
  <b-container>
    <b-row>
      <b-col md="4">
        <EngineForm/>
      </b-col>
      <b-col md="8">
        <EnginePlot/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import EngineForm from '@/components/engine/EngineForm.vue';
import EnginePlot from '@/components/engine/EnginePlot.vue';

export default {
  name: 'Engine',
  components: {
    EngineForm,
    EnginePlot,
  },
};
</script>
