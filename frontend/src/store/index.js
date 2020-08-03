import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    engine: {
      form: {
        SLPower: 100,
        k: 0.1,
        maxAltitude: 10,
        engineType: 'piston',
        supercharger: [
          {
            id: 0,
            startAlt: 0,
            endAlt: 3,
            endPower: 150,
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
    ADD_STAGE(state, stage) {
      state.engine.form.supercharger.push(stage);
    },
    REMOVE_STAGE(state) {
      state.engine.form.supercharger.pop();
    },
    SET_START_ALT(state, { altitude, id }) {
      state.engine.form.supercharger[id].startAlt = altitude;
    },
    SET_END_ALT(state, { altitude, id }) {
      state.engine.form.supercharger[id].endAlt = altitude;
    },
    SET_END_POWER(state, { power, id }) {
      state.engine.form.supercharger[id].endPower = power;
    },
  },
  actions: {
    setK({ commit }, k) {
      commit('SET_K', parseFloat(k));
    },
    setSLPower({ commit }, power) {
      commit('SET_SL_POWER', parseFloat(power));
    },
    setMaxAlt({ commit }, altitude) {
      commit('SET_MAX_ALT', parseFloat(altitude));
    },
    setEngineType({ commit }, type) {
      commit('SET_ENGINE_TYPE', type);
    },
    addStage({ commit }, stage) {
      commit('ADD_STAGE', stage);
    },
    removeStage({ commit }) {
      commit('REMOVE_STAGE');
    },
    setStartAlt({ commit }, { val, id }) {
      commit('SET_START_ALT', { altitude: parseFloat(val), id });
    },
    setEndAlt({ commit }, { val, id }) {
      commit('SET_END_ALT', { altitude: parseFloat(val), id });
    },
    setEndPower({ commit }, { val, id }) {
      commit('SET_END_POWER', { power: parseFloat(val), id });
    },
  },
  getters: {
    maxAltUnits(state) {
      return state.engine.form.maxAltitude.toString().concat(' km');
    },
    stages(state) {
      return state.engine.form.supercharger.length;
    },
    lastStage(state) {
      return state.engine.form.supercharger.slice(-1)[0];
    },
  },
  modules: {
  },
});
