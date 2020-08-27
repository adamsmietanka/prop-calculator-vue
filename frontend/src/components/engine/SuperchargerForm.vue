<template>
  <b-card bg-variant="light" class="mb-2">
    <b-form-group :label="index ? 'Full Speed' : 'Half Speed'" label-class="font-weight-bold"/>
    <NumberInput name="Start altitude" v-if="index"
                 :number="stage[index].startAlt"
                 :rules="rulesStart()"
                 :setter="setStartAlt"
                 step="0.1"
                 unit="km"
                 size="sm"
                 cols="4"/>
    <NumberInput name="End altitude"
                 :number="stage[index].endAlt"
                 :rules="rulesEnd()"
                 :setter="setEndAlt"
                 step="0.1"
                 unit="km"
                 size="sm"
                 cols="4"/>
    <NumberInput name="End power"
                 :number="stage[index].endPower"
                 :rules="rulesEndPower()"
                 :setter="setEndPower"
                 unit="kW"
                 size="sm"
                 cols="4"/>
  </b-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import NumberInput from '../NumberInput.vue';

export default {
  name: 'SuperchargerStage',
  props: ['index'],
  components: {
    NumberInput,
  },
  computed: {
    ...mapState({
      engine: (state) => state.engine,
      stage: (state) => state.engine.supercharger,
    }),
    ...mapGetters(['stages']),
    isFirstStage() { return this.index === 0; },
    isLastStage() { return this.index + 1 === this.stages; },
  },
  methods: {
    setStartAlt(v) {
      this.$store.dispatch('setStartAlt', { val: v, id: this.index });
    },
    setEndAlt(v) {
      this.$store.dispatch('setEndAlt', { val: v, id: this.index });
    },
    setEndPower(v) {
      this.$store.dispatch('setEndPower', { val: v, id: this.index });
    },
    rulesStart() {
      return {
        required: true,
        min_value: this.isFirstStage ? 0 : this.stage[this.index - 1].endAlt,
        max_value: this.stage[this.index].endAlt,
      };
    },
    rulesEnd() {
      return {
        required: true,
        min_value: this.stage[this.index].startAlt,
        max_value: this.isLastStage ? this.engine.maxAltitude : this.stage[this.index + 1].startAlt,
      };
    },
    rulesEndPower() {
      return {
        required: true,
        min_value: this.stage[this.index].startPower,
        max_value: this.stage[this.index].startPower * 1.5,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.invalid-feedback {
  display: block;
}

.card-body > .form-group {
  margin-bottom: 0;
}

.input-group-append {
  width: 40px;
}
</style>
