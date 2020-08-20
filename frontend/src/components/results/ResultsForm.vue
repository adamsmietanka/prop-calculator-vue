<template>
  <div class="mt-2">
    <b-form-group label="Max airspeed">
      <ValidationProvider name="Max airspeed"
                          rules="required|between:50,200" v-slot="{ errors, valid }">
        <b-input-group append="m/s">
          <b-form-input type="number"
                        v-model="maxAirspeed"
                        @keyup="valid && setMaxAirspeed($event)"
                        @click="valid && setMaxAirspeed($event)"
                        :state="valid ? null : false"
                        aria-describedby="error"/>
        </b-input-group>
        <b-form-invalid-feedback id="error">{{ errors[0] }}</b-form-invalid-feedback>
      </ValidationProvider>
    </b-form-group>
    <b-form-group label="Step size">
      <b-form-radio-group v-model="stepSize" :options="['5', '10', '20']"/>
    </b-form-group>
    <b-form-group label="Diameter">
      <ValidationProvider name="Diameter" rules="required|between:0.5,5" v-slot="{ errors, valid }">
        <b-input-group append="m">
          <b-form-input type="number"
                        v-model="diameter"
                        step="0.01"
                        @keyup="valid && setDiameter($event)"
                        @click="valid && setDiameter($event)"
                        :state="valid ? null : false"
                        aria-describedby="error"/>
        </b-input-group>
        <b-form-invalid-feedback id="error">{{ errors[0] }}</b-form-invalid-feedback>
      </ValidationProvider>
    </b-form-group>
    <b-form-group label="Number of blades">
      <b-input-group :append="results.numberOfBlades.toString()">
        <b-form-input type="range" v-model="numberOfBlades" min="2" max="4"/>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Blade pitch">
      <b-form-radio-group v-model="bladePitch" :options="['Variable', 'Fixed']"/>
    </b-form-group>
    <b-form-group label="Altitude">
      <ValidationProvider name="Altitude" :rules="rulesAltitude()" v-slot="{ errors, valid }">
        <b-input-group append="km">
          <b-form-input type="number"
                        step="0.1"
                        v-model="altitude"
                        @keyup="valid && setAltitude($event)"
                        @click="valid && setAltitude($event)"
                        :state="valid ? null : false"
                        aria-describedby="error"/>
        </b-input-group>
        <b-form-invalid-feedback id="error">{{ errors[0] }}</b-form-invalid-feedback>
      </ValidationProvider>
    </b-form-group>
    <b-form-group label="Power">
      <b-input-group append="kW">
        <b-form-input disabled v-model="results.power" />
      </b-input-group>
    </b-form-group>
    <b-form-group label="Cp">
      <b-form-input disabled v-model="Cp" />
    </b-form-group>
    <b-button block variant="primary" @click="update" class="mt-2">Update</b-button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'ResultsForm',
  data() {
    return {
      maxAirspeed: 150,
      diameter: 3,
      altitude: 0,
    };
  },
  created() {
    this.maxAirspeed = this.results.maxAirspeed;
    this.diameter = this.results.diameter;
    this.altitude = this.results.altitude;
    this.update();
  },
  computed: {
    ...mapState({
      results: (state) => state.results.form,
      engine: (state) => state.engine,
    }),
    ...mapGetters(['maxAltUnits']),
    maxAltitude: {
      get() { return this.engine.maxAltitude; },
      set(v) { this.$store.dispatch('setMaxAlt', v); },
    },
    stepSize: {
      get() { return this.results.stepSize; },
      set(v) { this.$store.dispatch('setStepSize', v); },
    },
    numberOfBlades: {
      get() { return this.results.numberOfBlades; },
      set(v) { this.$store.dispatch('setNumberOfBlades', v); },
    },
    bladePitch: {
      get() { return this.results.bladePitch; },
      set(v) { this.$store.dispatch('setBladePitch', v); },
    },
    Cp() {
      const rho = 1.2255 * (1 - (this.results.altitude / 44.3)) ** 4.256;
      const propSpeed = (this.engine.revs / 60) * this.engine.ratio;
      const Cp = (this.results.power * 1000) / (rho * propSpeed ** 3 * this.results.diameter ** 5);
      return parseFloat(Cp.toPrecision(4));
    },
    propSpeed() {
      return (this.engine.revs / 60) * this.engine.ratio;
    },
  },
  methods: {
    setMaxAirspeed(e) {
      this.$store.dispatch('setMaxAirspeed', e.target.value);
    },
    setDiameter(e) {
      this.$store.dispatch('setDiameter', e.target.value);
    },
    setAltitude(e) {
      this.$store.dispatch('setAltitude', e.target.value);
    },
    rulesAltitude() {
      return {
        required: true,
        min_value: 0,
        max_value: this.engine.maxAltitude,
      };
    },
    update() {
      this.$store.dispatch('postData', {
        Cp: this.Cp,
        prop_speed: this.propSpeed,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-range {
  border: none;
  margin-left: -10px;
}

.custom-range + .input-group-append {
  margin-left: 0;
}

.invalid-feedback {
  display: block;
}

button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
