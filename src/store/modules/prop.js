import axios from 'axios';
import { roundPower } from './engine/helpers';

export default {
  state: {
    form: {
      maxSpeed: 150,
      cruiseAltitude: 3,
      cruisePower: 800,
      diameterType: 'Optimized',
      diameter: 3.902,
      mach: 1,
      numberOfBlades: 3,
      bladePitch: 'Variable',
      angle: 30,
      bladeMaterial: 'Metal',
    },
    table: [],
    chart: {
      data: [
        { type: 'surface' },
      ],
    },
  },
  mutations: {
    SET_MAX_SPEED(state, speed) {
      state.form.maxSpeed = speed;
    },
    SET_CRUISE_ALTITUDE(state, altitude) {
      state.form.cruiseAltitude = altitude;
    },
    SET_CRUISE_POWER(state, power) {
      state.form.cruisePower = power;
    },
    SET_DIAMETER_TYPE(state, diameter) {
      state.form.diameterType = diameter;
    },
    SET_DIAMETER(state, diameter) {
      state.form.diameter = diameter;
    },
    SET_TIP_MACH(state, number) {
      state.form.mach = number;
    },
    SET_NUMBER_OF_BLADES(state, val) {
      state.form.numberOfBlades = val;
    },
    SET_BLADE_PITCH(state, pitch) {
      state.form.bladePitch = pitch;
    },
    SET_ANGLE(state, angle) {
      state.form.angle = angle;
    },
    SET_BLADE_MATERIAL(state, material) {
      state.form.bladeMaterial = material;
    },
    SET_PROP_TABLE(state, table) {
      state.table = table;
    },
    SET_PROP_CHART(state, chart) {
      state.chart = chart;
    },
  },
  actions: {
    setMaxSpeed({ commit }, speed) {
      commit('SET_MAX_SPEED', parseFloat(speed));
    },
    setCruiseAltitude({ commit, dispatch }, altitude) {
      commit('SET_CRUISE_ALTITUDE', parseFloat(altitude));
      dispatch('setCruisePower', altitude);
    },
    setCruisePower({ commit, rootState }, altitude) {
      commit('SET_CRUISE_POWER', roundPower(rootState.engine, parseFloat(altitude)));
    },
    setDiameterType({ commit, dispatch, state }, diameter) {
      commit('SET_DIAMETER_TYPE', diameter);
      if (diameter === 'Optimized') {
        dispatch('updatePropeller', state.table);
      }
    },
    setDiameter({ commit }, diameter) {
      commit('SET_DIAMETER', parseFloat(diameter));
    },
    setTipMach({ commit }, number) {
      commit('SET_TIP_MACH', parseFloat(number));
    },
    setNumberOfBlades({ commit, dispatch, state }, val) {
      commit('SET_NUMBER_OF_BLADES', parseFloat(val));
      dispatch('updatePropeller', state.table);
    },
    setBladePitch({ commit }, pitch) {
      commit('SET_BLADE_PITCH', pitch);
    },
    setAngle({ commit }, angle) {
      commit('SET_ANGLE', parseFloat(angle));
    },
    setBladeMaterial({ commit }, material) {
      commit('SET_BLADE_MATERIAL', material);
    },
    async postPropData({ dispatch }, data) {
      axios.get('https://1uvcjdfuz3.execute-api.eu-central-1.amazonaws.com/dev/diameter', {params: data})
      .then((res) => {
        const table = JSON.stringify(res.data, (_key, val) => val.toFixed ? Number(val.toFixed(3)) : val);
        dispatch('setPropTable', JSON.parse(table));
        dispatch('updatePropeller', JSON.parse(table));
        dispatch('setDiameterType', 'Optimized');
      });
      axios.post('/api/prop', data)
        .then((res) => {
          dispatch('setPropChart', res.data.chart);
        });
    },
    updatePropeller({ dispatch, state }, table) {
      const row = table.find(({ Blades }) => Blades === state.form.numberOfBlades.toString());
      dispatch('setDiameter', row.Diameter);
      dispatch('setTipMach', row.Mach);
    },
    setPropTable({ commit }, table) {
      commit('SET_PROP_TABLE', table);
    },
    setPropChart({ commit }, chart) {
      commit('SET_PROP_CHART', chart);
    },
  },
};
