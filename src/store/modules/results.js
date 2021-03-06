import axios from 'axios';
import { roundPower } from './engine/helpers';

export default {
  state: {
    form: {
      stepSize: 10,
      altitude: 0,
      power: 800,
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
    async postData({ dispatch }, params) {
      let request;
      if (params.pitch === 'Variable') {
        request = axios.get('https://k2yzx7le7i.execute-api.eu-central-1.amazonaws.com/dev/prop_results_variable', { params })
      } else {
        request = axios.get('https://0dog08xcmk.execute-api.eu-central-1.amazonaws.com/default/results_fixed', { params })
      }
      request.then((res) => {
        let data = JSON.stringify(res.data, (_key, val) => val.toFixed ? Number(val.toPrecision(4)) : val);
        data = JSON.parse(data)
        dispatch('setTable', data.table);
        dispatch('setCharts', data.charts);
      });
    },
    setTable({ commit }, table) {
      commit('SET_TABLE', table);
    },
    setCharts({ commit }, charts) {
      commit('SET_CHARTS', charts);
    },
  },
};
