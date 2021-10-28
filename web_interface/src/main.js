import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

library.add(fas);

createApp(App)
  .component("fa", FontAwesomeIcon)
  .use(ElementPlus)
  .use(VueChartkick)
  .use(store)
  .use(router)
  .mount("#app");
