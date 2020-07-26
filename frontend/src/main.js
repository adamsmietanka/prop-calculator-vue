import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueFormulate from '@braid/vue-formulate';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(BootstrapVue);
Vue.use(VueFormulate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
