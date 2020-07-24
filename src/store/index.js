import Vue from "vue";
import Vuex from "vuex";

import { alert } from "./modules/alert.module";
import { account } from "./modules/account.module";
import { users } from "./modules/users.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    alert,
    account,
    users
  },
});
