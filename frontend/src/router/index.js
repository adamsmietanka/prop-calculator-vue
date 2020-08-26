import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Engine from '../views/Engine.vue';
import Propeller from '../views/Propeller.vue';
import Results from '../views/Results.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/engine',
    name: 'Engine',
    component: Engine,
  },
  {
    path: '/propeller',
    name: 'Propeller',
    component: Propeller,
  },
  {
    path: '/results',
    name: 'Results',
    component: Results,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
