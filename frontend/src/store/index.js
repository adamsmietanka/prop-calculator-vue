import Vue from 'vue';
import Vuex from 'vuex';
import engine from './modules/engine';
import results from './modules/results';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    engine,
    results,
  },
});
