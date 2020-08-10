export default {
  state: {
    enabled: false,
    altitude: 7,
  },
  mutations: {
    TOGGLE_TURBO(state, val) {
      state.enabled = val;
    },
    SET_TURBO_ALT(state, altitude) {
      state.altitude = altitude;
    },
  },
  actions: {
    toggleTurbo({ commit }, val) {
      commit('TOGGLE_TURBO', val);
    },
    setTurboAlt({ commit }, altitude) {
      commit('SET_TURBO_ALT', parseFloat(altitude));
    },
  },
  getters: {
    turboAltUnits(state) {
      return state.altitude.toString().concat(' km');
    },
  },
};
