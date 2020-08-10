import Vue from 'vue';
import { curvePower } from './helpers';

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
    removeStage({ commit, dispatch }) {
      commit('REMOVE_STAGE');
      dispatch('updateData');
    },
    setStartAlt({ commit, dispatch }, { id, val }) {
      commit('SET_START_ALT', { id, altitude: parseFloat(val) });
      dispatch('updateStage');
    },
    setEndAlt({ commit, dispatch }, { id, val }) {
      commit('SET_END_ALT', { id, altitude: parseFloat(val) });
      dispatch('updateStage');
    },
    updateStage({ commit, dispatch, rootState }) {
      for (const [index, stage] of rootState.engine.supercharger.entries()) {
        let startPower = rootState.engine.SLPower;
        if (index === 1) {
          const { endAlt, endPower } = rootState.engine.supercharger[0];
          startPower = curvePower(endAlt, endPower, stage.startAlt, rootState.engine.k);
        }
        stage.startPower = startPower;
        commit('UPDATE_STAGE', { id: index, stage });
      }
      dispatch('updateData');
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
