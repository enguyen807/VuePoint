import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import axios from "axios";

require("dotenv").config();

Vue.prototype.$http = axios;

const user = JSON.parse(localStorage.getItem("user")) || {}

if (user.token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = user.token;
}
Vue.config.productionTip = false;


new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
