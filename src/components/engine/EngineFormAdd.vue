<template>
  <b-row class="mt-2">
    <b-col md="6">
      <NumberInput name="Engine speed"
                   :number="engine.revs"
                   rules="required|between:2000,7000"
                   :setter="setRevs"
                   unit="rpm"
                   step="100"/>
    </b-col>
    <b-col md="6">
      <NumberInput name="Reduction ratio"
                   :number="engine.ratio"
                   rules="required|between:0,1"
                   :setter="setRatio"
                   unit=":1"
                   step="0.01"/>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from 'vuex';
import NumberInput from '../NumberInput.vue';

export default {
  name: 'EngineFormAdd',
  components: {
    NumberInput,
  },
  computed: {
    ...mapState({ engine: (state) => state.engine }),
  },
  methods: {
    setRatio(v) {
      this.$store.dispatch('setRatio', v);
    },
    setRevs(v) {
      this.$store.dispatch('setRevs', v);
    },
  },
};
</script>

<style lang="scss" scoped>
.invalid-feedback {
  display: block;
}
</style>
