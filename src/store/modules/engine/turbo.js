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
    toggleTurbo({ commit, dispatch }, val) {
      commit("TOGGLE_TURBO", val);
      dispatch("updateStage");
      dispatch("updateData");
    },
    setTurboAlt({ commit, dispatch }, altitude) {
      commit("SET_TURBO_ALT", parseFloat(altitude));
      dispatch("updateStage");
      dispatch("updateData");
    },
  },
  getters: {
    turboAltUnits(state) {
      return state.altitude.toPrecision(2).concat(" km");
    },
  },
};
