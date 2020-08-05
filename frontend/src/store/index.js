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
            startPower: 100,
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
    UPDATE_STAGE(state, { id, stage }) {
      Vue.set(state.engine.form.supercharger, id, stage);
    },
    SET_START_ALT(state, { id, altitude }) {
      state.engine.form.supercharger[id].startAlt = altitude;
    },
    SET_END_ALT(state, { id, altitude }) {
      state.engine.form.supercharger[id].endAlt = altitude;
    },
    SET_END_POWER(state, { id, power }) {
      state.engine.form.supercharger[id].endPower = power;
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
    addStage({ commit, dispatch }, stage) {
      commit('ADD_STAGE', stage);
      dispatch('updateStage');
    },
    removeStage({ commit }) {
      commit('REMOVE_STAGE');
    },
    setStartAlt({ commit, dispatch }, { id, val }) {
      commit('SET_START_ALT', { id, altitude: parseFloat(val) });
      dispatch('updateStage');
    },
    setEndAlt({ commit, dispatch }, { id, val }) {
      commit('SET_END_ALT', { id, altitude: parseFloat(val) });
      dispatch('updateStage');
    },
    updateStage({ commit }) {
      const supercharger = this.state.engine.form.supercharger;
      supercharger.forEach(({ startAlt }, index) => {
        let stage = supercharger[index];
        let startPower;
        if (index === 0)
          startPower = this.state.engine.form.SLPower;
        else {
          const { endAlt, endPower } = supercharger[index - 1];

          // International Standard atmosphere
          const sigma = ((44.3 - startAlt) / (44.3 - endAlt)) ** 4.256;
          const k = this.state.engine.form.k;

          startPower = endPower * ((sigma - k) / (1 - k));
          startPower = Math.round(startPower * 100) / 100;
        }
        stage.startPower = startPower;
        commit('UPDATE_STAGE', {id: index, stage});
      });
    },
    setEndPower({ commit, dispatch }, { id, val }) {
      commit('SET_END_POWER', { id, power: parseFloat(val) });
      dispatch('updateStage');
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
