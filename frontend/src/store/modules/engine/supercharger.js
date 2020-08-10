import Vue from 'vue';

export default {
  state: [
    {
      id: 0,
      startAlt: 0,
      startPower: 100,
      endAlt: 3,
      endPower: 150,
    },
  ],
  mutations: {
    ADD_STAGE(state, stage) {
      state.push(stage);
    },
    REMOVE_STAGE(state) {
      state.pop();
    },
    UPDATE_STAGE(state, { id, stage }) {
      Vue.set(state, id, stage);
    },
    SET_START_ALT(state, { id, altitude }) {
      state[id].startAlt = altitude;
    },
    SET_END_ALT(state, { id, altitude }) {
      state[id].endAlt = altitude;
    },
    SET_END_POWER(state, { id, power }) {
      state[id].endPower = power;
    },
  },
  actions: {
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
    updateStage({ state, commit, rootState }) {
      for (const [index, stage] of state.entries()) {
        let startPower = rootState.engine.SLPower;
        if (index === 1) {
          const { endAlt, endPower } = state[0];
          // International Standard atmosphere
          const sigma = ((44.3 - stage.startAlt) / (44.3 - endAlt)) ** 4.256;
          startPower = endPower * ((sigma - rootState.engine.k) / (1 - rootState.engine.k));
          startPower = parseFloat(startPower.toPrecision(4));
        }
        stage.startPower = startPower;
        commit('UPDATE_STAGE', { id: index, stage });
      }
    },
    setEndPower({ commit, dispatch }, { id, val }) {
      commit('SET_END_POWER', { id, power: parseFloat(val) });
      dispatch('updateStage');
    },
  },
  getters: {
    stages(state) {
      return state.length;
    },
    lastStage(state) {
      return state.slice(-1)[0];
    },
  },
};
