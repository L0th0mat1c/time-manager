import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/workingtimes/:userID",
    name: "Work",
    component: () =>
      import("../views/WorkingTimesView.vue"),
  },
  {
    path: "/workingtime/:userID",
    name: "WorkCreate",
    component: () =>
      import("../views/WorkingTimesView.vue"),
    props: {
      edit: true
    }
  },
  {
    path: "/workingtime/:userID/:wtID",
    name: "WorkEdit",
    component: () =>
      import("../views/WorkingTimesView.vue"),
    props: {
      edit: true
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
