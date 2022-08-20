import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
const Engine = () => import("../views/Engine.vue");
const Propeller = () => import("../views/Propeller.vue");
const Results = () => import("../views/Results.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/engine",
    name: "Engine",
    component: Engine,
  },
  {
    path: "/propeller",
    name: "Propeller",
    component: Propeller,
  },
  {
    path: "/results",
    name: "Results",
    component: Results,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
