import Vue from 'vue';
import Vuex from 'vuex';
import engine from './modules/engine';
import prop from './modules/prop';
import results from './modules/results';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    engine,
    prop,
    results,
  },
});
