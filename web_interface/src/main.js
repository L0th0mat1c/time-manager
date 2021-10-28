import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Axios from "axios";
import VueAxios from "vue-axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";
VueChartkick.options = {
  colors: ["#ffa333", "#525252"],
};

library.add(fas);

Axios.defaults.baseURL = "http://localhost:4000/api";
Axios.defaults.headers.common["Content-Type"] = "application/json";
const token = localStorage.getItem("token");
if (token) {
  Axios.defaults.headers.common["Authorization"] = token;
}

createApp(App)
  .component("fa", FontAwesomeIcon)
  .use(ElementPlus)
  .use(VueChartkick)
  .use(VueAxios, Axios)
  .use(store)
  .use(router)
  .mount("#app");
