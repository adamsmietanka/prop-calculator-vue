import axios from 'axios';
import { roundPower } from './engine/helpers';

export default {
  state: {
    form: {
      stepSize: 10,
      altitude: 0,
      power: 800,
    },
    hovered: {
      color: [],
    },
    table: [],
    charts: {
      eff: {
        data: [
          { type: 'surface' },
        ],
      },
      cp: {
        data: [
          { type: 'surface' },
        ],
      },
    },
  },
  mutations: {
    SET_STEP_SIZE(state, step) {
      state.form.stepSize = step;
    },
    SET_ALTITUDE(state, altitude) {
      state.form.altitude = altitude;
    },
    SET_POWER(state, power) {
      state.form.power = power;
    },
    SET_TABLE(state, table) {
      state.table = table;
    },
    SET_CHARTS(state, charts) {
      state.charts = charts;
    },
    SET_HOVERED(state, color) {
      state.hovered.color = color;
    },
  },
  actions: {
    setStepSize({ commit }, step) {
      commit('SET_STEP_SIZE', parseFloat(step));
    },
    setAltitude({ commit, dispatch }, altitude) {
      commit('SET_ALTITUDE', parseFloat(altitude));
      dispatch('setPower', altitude);
    },
    setPower({ commit, rootState }, altitude) {
      commit('SET_POWER', roundPower(rootState.engine, parseFloat(altitude)));
    },
    async postData({ dispatch }, data) {
      axios.post('/api/data', data)
        .then((response) => {
          dispatch('setTable', response.data.table);
          dispatch('setCharts', response.data.charts);
        });
    },
    setTable({ commit }, table) {
      commit('SET_TABLE', table);
    },
    setCharts({ commit }, charts) {
      commit('SET_CHARTS', charts);
    },
    setHovered({ commit }, color) {
      commit('SET_HOVERED', color);
    },
  },
};
