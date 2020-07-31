import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    engine: {
      form: {
        SLPower: '100',
        k: '0.1',
        maxAltitude: '10',
        engineType: 'piston',
        supercharger: [
          {
            startAlt: '0',
            endAlt: '3',
            endPower: '1000',
          },
        ],
      },
      data: {},
    },
  },
  mutations: {
    SET_K(state, k) {
      state.engine.form.k = k;
    },
    SET_SL_POWER(state, power) {
      state.engine.form.SLPower = power;
    },
    SET_MAX_ALT(state, altitude) {
      state.engine.form.maxAltitude = altitude;
    },
    SET_ENGINE_TYPE(state, type) {
      state.engine.form.engineType = type;
    },
  },
  actions: {
    setK({ commit }, k) {
      commit('SET_K', k);
    },
    setSLPower({ commit }, power) {
      commit('SET_SL_POWER', power);
    },
    setMaxAlt({ commit }, altitude) {
      commit('SET_MAX_ALT', altitude);
    },
    setEngineType({ commit }, type) {
      commit('SET_ENGINE_TYPE', type);
    },
  },
  getters: {
    maxAltUnits(state) {
      return state.engine.form.maxAltitude.concat(' km');
    },
    stages(state) {
      return state.engine.form.supercharger.length;
    },
  },
  modules: {
  },
});
