import turbocharger from './engine/turbo';
import supercharger from './engine/supercharger';
import { prepareX, roundPower } from './engine/helpers';

export default {
  modules: {
    turbocharger,
    supercharger,
  },
  state: {
    SLPower: 800,
    k: 0.1,
    maxAltitude: 10,
    type: 'Piston',
    ratio: 0.4,
    revs: 3000,
    data: {
      x: [],
      y: [],
    },
  },
  mutations: {
    SET_K(state, k) {
      state.k = k;
    },
    SET_SL_POWER(state, power) {
      state.SLPower = power;
    },
    SET_MAX_ALT(state, altitude) {
      state.maxAltitude = altitude;
    },
    SET_ENGINE_TYPE(state, type) {
      state.type = type;
    },
    SET_RATIO(state, ratio) {
      state.ratio = ratio;
    },
    SET_REVS(state, revs) {
      state.revs = revs;
    },
    SET_DATA(state, data) {
      state.data = data;
    },
  },
  actions: {
    setSLPower({ commit, dispatch }, power) {
      commit('SET_SL_POWER', parseFloat(power));
      dispatch('updateStage');
    },
    setK({ commit, dispatch }, k) {
      commit('SET_K', parseFloat(k));
      dispatch('updateStage');
    },
    setMaxAlt({ commit }, altitude) {
      commit('SET_MAX_ALT', parseFloat(altitude));
    },
    setEngineType({ commit, dispatch }, type) {
      commit('SET_ENGINE_TYPE', type);
      dispatch('updateData');
    },
    setRatio({ commit }, ratio) {
      commit('SET_RATIO', parseFloat(ratio));
    },
    setRevs({ commit }, revs) {
      commit('SET_REVS', parseFloat(revs));
    },
    updateData({ state, commit }) {
      const x = prepareX(state);
      const y = x.map((i) => roundPower(state, i));
      commit('SET_DATA', { x, y });
    },
  },
  getters: {
    maxAltUnits(state) {
      return state.maxAltitude.toString().concat(' km');
    },
  },
};
