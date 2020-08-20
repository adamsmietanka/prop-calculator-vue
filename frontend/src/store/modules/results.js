import axios from 'axios';
import { roundPower } from './engine/helpers';

export default {
  state: {
    form: {
      maxAirspeed: 150,
      stepSize: 10,
      diameter: 3.2,
      numberOfBlades: 3,
      bladePitch: 'Variable',
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
    SET_MAX_AIRSPEED(state, speed) {
      state.form.maxAirspeed = speed;
    },
    SET_STEP_SIZE(state, step) {
      state.form.stepSize = step;
    },
    SET_DIAMETER(state, diameter) {
      state.form.diameter = diameter;
    },
    SET_NUMBER_OF_BLADES(state, val) {
      state.form.numberOfBlades = val;
    },
    SET_BLADE_PITCH(state, pitch) {
      state.form.bladePitch = pitch;
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
    SET_CAMERA(state, { cameraCp, cameraEff }) {
      state.charts.cp.layout.scene.camera.eye = cameraCp;
      state.charts.eff.layout.scene.camera.eye = cameraEff;
    },
  },
  actions: {
    setMaxAirspeed({ commit }, speed) {
      commit('SET_MAX_AIRSPEED', parseFloat(speed));
    },
    setStepSize({ commit }, step) {
      commit('SET_STEP_SIZE', parseFloat(step));
    },
    setDiameter({ commit }, diameter) {
      commit('SET_DIAMETER', parseFloat(diameter));
    },
    setNumberOfBlades({ commit }, val) {
      commit('SET_NUMBER_OF_BLADES', parseFloat(val));
    },
    setBladePitch({ commit }, pitch) {
      commit('SET_BLADE_PITCH', parseFloat(pitch));
    },
    setAltitude({ commit, rootState }, altitude) {
      const alt = parseFloat(altitude);
      commit('SET_ALTITUDE', alt);
      commit('SET_POWER', roundPower(rootState.engine, alt));
    },
    async postData({ dispatch, state }, data) {
      axios.post('http://localhost:5000/test', {
        ...state.form,
        ...data,
      })
        .then((response) => {
          dispatch('setTable', response.data.table);
          dispatch('setCharts', response.data.charts);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    setTable({ commit }, table) {
      commit('SET_TABLE', table);
    },
    setCharts({ commit }, charts) {
      // const cameraCp = state.charts.cp.layout.scene.camera.eye;
      // const cameraEff = state.charts.eff.layout.scene.camera.eye;
      commit('SET_CHARTS', charts);
      // commit('SET_CAMERA', { cameraCp, cameraEff });
    },
  },
};
