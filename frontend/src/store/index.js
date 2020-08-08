import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    engine: {
      SLPower: 100,
      k: 0.1,
      maxAltitude: 10,
      type: 'piston',
      supercharger: [
        {
          id: 0,
          startAlt: 0,
          startPower: 100,
          endAlt: 3,
          endPower: 150,
        },
      ],
      turbocharger: {
        enabled: false,
        altitude: 7,
      },
      ratio: 0.4,
      revs: 50,
    },
  },
  mutations: {
    SET_K(state, k) {
      state.engine.k = k;
    },
    SET_SL_POWER(state, power) {
      state.engine.SLPower = power;
    },
    SET_MAX_ALT(state, altitude) {
      state.engine.maxAltitude = altitude;
    },
    SET_ENGINE_TYPE(state, type) {
      state.engine.type = type;
    },
    ADD_STAGE(state, stage) {
      state.engine.supercharger.push(stage);
    },
    REMOVE_STAGE(state) {
      state.engine.supercharger.pop();
    },
    UPDATE_STAGE(state, { id, stage }) {
      Vue.set(state.engine.supercharger, id, stage);
    },
    SET_START_ALT(state, { id, altitude }) {
      state.engine.supercharger[id].startAlt = altitude;
    },
    SET_END_ALT(state, { id, altitude }) {
      state.engine.supercharger[id].endAlt = altitude;
    },
    SET_END_POWER(state, { id, power }) {
      state.engine.supercharger[id].endPower = power;
    },
    TOGGLE_TURBO(state, val) {
      state.engine.turbocharger.enabled = val;
    },
    SET_TURBO_ALT(state, altitude) {
      state.engine.turbocharger.altitude = altitude;
    },
    SET_RATIO(state, ratio) {
      state.engine.ratio = ratio;
    },
    SET_REVS(state, revs) {
      state.engine.revs = revs;
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
      const { supercharger } = this.state.engine;
      supercharger.forEach(({ startAlt }, index) => {
        const stage = supercharger[index];
        let startPower;
        if (index === 0) {
          startPower = this.state.engine.SLPower;
        } else {
          const { endAlt, endPower } = supercharger[index - 1];

          // International Standard atmosphere
          const sigma = ((44.3 - startAlt) / (44.3 - endAlt)) ** 4.256;
          const { k } = this.state.engine;

          startPower = endPower * ((sigma - k) / (1 - k));
          startPower = parseFloat(startPower.toPrecision(4));
        }
        stage.startPower = startPower;
        commit('UPDATE_STAGE', { id: index, stage });
      });
    },
    setEndPower({ commit, dispatch }, { id, val }) {
      commit('SET_END_POWER', { id, power: parseFloat(val) });
      dispatch('updateStage');
    },
    toggleTurbo({ commit }, val) {
      commit('TOGGLE_TURBO', val);
    },
    setTurboAlt({ commit }, altitude) {
      commit('SET_TURBO_ALT', parseFloat(altitude));
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
      return state.engine.maxAltitude.toString().concat(' km');
    },
    turboAltUnits(state) {
      return state.engine.turbocharger.altitude.toString().concat(' km');
    },
    stages(state) {
      return state.engine.supercharger.length;
    },
    lastStage(state) {
      return state.engine.supercharger.slice(-1)[0];
    },
  },
  modules: {
  },
});
