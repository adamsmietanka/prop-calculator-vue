import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    engine: {
      form: {
        SLPower: 100,
        k: 0.1,
        engineType: 'piston',
        supercharger: [
          {
            startAlt: 0,
            endAlt: 3,
            endPower: 1000,
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
  },
  actions: {
  },
  getters: {
    engineForm: (state) => state.engine.form,
  },
  modules: {
  },
});
