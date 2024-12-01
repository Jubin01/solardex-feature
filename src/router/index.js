import Vue from 'vue'
import VueRouter from "vue-router";

import Home from "../views/home/home.vue"
import Moon from "../views/moon/moon.vue"

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
  }

];

const router = new VueRouter({
  routes,
});

export default router

