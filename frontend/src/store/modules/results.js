import { roundPower } from './engine/helpers';

export default {
  state: {
    maxAirspeed: 150,
    stepSize: 10,
    diameter: 3,
    numberOfBlades: 3,
    bladePitch: 'Variable',
    altitude: 0,
    power: 100,
  },
  mutations: {
    SET_MAX_AIRSPEED(state, speed) {
      state.maxAirspeed = speed;
    },
    SET_STEP_SIZE(state, step) {
      state.stepSize = step;
    },
    SET_DIAMETER(state, diameter) {
      state.diameter = diameter;
    },
    SET_NUMBER_OF_BLADES(state, val) {
      state.numberOfBlades = val;
    },
    SET_BLADE_PITCH(state, pitch) {
      state.bladePitch = pitch;
    },
    SET_ALTITUDE(state, altitude) {
      state.altitude = altitude;
    },
    SET_POWER(state, power) {
      state.power = power;
    },
  },
  actions: {
    setMaxAirspeed({ commit }, speed) {
      commit('SET_MAX_AIRSPEED', parseFloat(speed));
    },
    setStepSize({ commit }, step) {
      commit('SET_STEP_SIZE', parseFloat(step));
    },
    setDiameter({ commit }, diameter) {
      commit('SET_DIAMETER', parseFloat(diameter));
    },
    setNumberOfBlades({ commit }, val) {
      commit('SET_NUMBER_OF_BLADES', parseFloat(val));
    },
    setBladePitch({ commit }, pitch) {
      commit('SET_BLADE_PITCH', parseFloat(pitch));
    },
    setAltitude({ commit, rootState }, altitude) {
      altitude = parseFloat(altitude);
      commit('SET_ALTITUDE', altitude);
      commit('SET_POWER', roundPower(rootState.engine, altitude));
    },
  },
};
