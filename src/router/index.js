import Vue from 'vue'
import VueRouter from "vue-router";

import Home from "../views/home/home.vue"
import Moon from "../views/moon/moon.vue"
import PlanetDetails from "../views/home/planet-details.vue"
import MoonDetails from "../views/moon/moon-details.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/moon/:id/:i",
    name: "moon",
    component: Moon
  },
  {
    path: "/planet-details/:id/:i",
    name: "planet-details",
    component: PlanetDetails
  },
  {
    path: "/moon-details/:id/:i",
    name: "moon-details",
    component: MoonDetails
  }

];

const router = new VueRouter({
  routes,
});

export default router

