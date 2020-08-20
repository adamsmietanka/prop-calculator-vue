<template>
<b-card bg-variant="light" class="mb-2">
  <b-form-group :label="index ? 'Full Speed' : 'Half Speed'" label-class="font-weight-bold"/>
  <b-form-group label-cols="4" label-size="sm" label="Start altitude:" v-if="index">
    <ValidationProvider name="Start altitude " :rules="rulesStart()" v-slot="{ errors, valid }">
      <b-input-group size="sm" append="km">
        <b-form-input type="number"
                      step="0.1"
                      size="sm"
                      v-model="startAlt"
                      @keyup="valid && setStartAlt($event)"
                      @click="valid && setStartAlt($event)"
                      :state="valid && null"
                      aria-describedby="error"/>
      </b-input-group>
      <b-form-invalid-feedback id="error">{{ errors[0] }}</b-form-invalid-feedback>
    </ValidationProvider>
  </b-form-group>
  <b-form-group label-cols="4" label-size="sm" label="End altitude:" >
    <ValidationProvider name="End altitude" :rules="rulesEnd()" v-slot="{ errors, valid }">
      <b-input-group size="sm" append="km">
        <b-form-input type="number"
                      step="0.1"
                      size="sm"
                      v-model="endAlt"
                      @keyup="valid && setEndAlt($event)"
                      @click="valid && setEndAlt($event)"
                      :state="valid && null"
                      aria-describedby="error"/>
      </b-input-group>
      <b-form-invalid-feedback id="error">{{ errors[0] }}</b-form-invalid-feedback>
    </ValidationProvider>
  </b-form-group>
  <b-form-group label-cols="4" label-size="sm" label="End power:" >
    <ValidationProvider name="End power" :rules="rulesEndPower()" v-slot="{ errors, valid }">
      <b-input-group size="sm" append="kW">
        <b-form-input type="number"
                      size="sm"
                      v-model="endPower"
                      @keyup="valid && setEndPower($event)"
                      @click="valid && setEndPower($event)"
                      :state="valid && null"
                      aria-describedby="error"/>
      </b-input-group>
      <b-form-invalid-feedback id="error">{{ errors[0] }}</b-form-invalid-feedback>
    </ValidationProvider>
  </b-form-group>
</b-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'SuperchargerStage',
  props: ['index'],
  data() {
    return {
      startAlt: 0,
      startPower: 800,
      endAlt: 3,
      endPower: 1000,
    };
  },
  created() {
    this.startAlt = this.stage[this.index].startAlt;
    this.endAlt = this.stage[this.index].endAlt;
    this.endPower = this.stage[this.index].endPower;
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
    setStartAlt(e) {
      this.$store.dispatch('setStartAlt', { val: e.target.value, id: this.index });
    },
    setEndAlt(e) {
      this.$store.dispatch('setEndAlt', { val: e.target.value, id: this.index });
    },
    setEndPower(e) {
      this.$store.dispatch('setEndPower', { val: e.target.value, id: this.index });
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
