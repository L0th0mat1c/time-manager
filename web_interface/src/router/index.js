import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Clock from "../views/Clock.vue";
import Chart from "../views/Chart.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/clock/:username",
    name: "Clock",
    component: Clock,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/chartManager/:userid",
    name: "Chart",
    component: Chart,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
