import turbocharger from './engine/turbo';
import supercharger from './engine/supercharger';

export default {
  modules: {
    turbocharger,
    supercharger,
  },
  state: {
    SLPower: 100,
    k: 0.1,
    maxAltitude: 10,
    type: 'piston',
    ratio: 0.4,
    revs: 50,
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
    setEngineType({ commit }, type) {
      commit('SET_ENGINE_TYPE', type);
    },
    setRatio({ commit }, ratio) {
      commit('SET_RATIO', parseFloat(ratio));
    },
    setRevs({ commit }, revs) {
      commit('SET_REVS', parseFloat(revs));
    },
  },
  getters: {
    maxAltUnits(state) {
      return state.maxAltitude.toString().concat(' km');
    },
  },
};
