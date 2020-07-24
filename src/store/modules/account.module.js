import { userService } from "../../services/user.service";
import router from "../../router/index";
import jwt_decode from "jwt-decode";

// https://blog.sqreen.com/authentication-best-practices-vue/
//https://jasonwatmore.com/post/2018/07/14/vue-vuex-user-registration-and-login-tutorial-example

const user = JSON.parse(localStorage.getItem("user"));
// console.log(user.token)

// const expiresIn = user
//   ? jwt_decode(JSON.parse(localStorage.getItem("user")).token).exp
//   : "";

// console.log(expiresIn);
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const mutations = {
  registerRequest(state) {
    state.status = { registering: true };
  },
  registerSuccess(state) {
    state.status = { registerSuccess: true };
  },
  registerFailure(state) {
    state.status = { registerFailure: true };
  },
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
};

const actions = {
  setLogoutTimer({ commit }, expirationTime) {
    setTimeout(() => {
      userService.logout();
      commit("logout");
      router.push("/login");
    }, expirationTime);
  },
  async register({ dispatch, commit }, { email, password, fullName, country }) {
    commit("registerRequest", user);

    try {
      const res = await userService.register(
        email,
        password,
        fullName,
        country
      );
      commit("registerSuccess", res);
      setTimeout(() => {
        // display success message after route change completes
        dispatch("alert/success", "Registration successful", { root: true });
      });
      router.push("/login");
    } catch (error) {
      const errorMsg = error.response.data.errors[0].message;
      commit("registerFailure", errorMsg);
      dispatch("alert/error", errorMsg, { root: true });
    }
  },
  async login({ dispatch, commit }, { email, password }) {
    commit("loginRequest", { email });

    try {
      const res = await userService.login(email, password);
      commit("loginSuccess", email);

      const exp = jwt_decode(res.data.data.login.token).exp;
      const iat = jwt_decode(res.data.data.login.token).iat;

      const expiresIn = (exp - iat) * 1000;

      console.log(expiresIn);
      setTimeout(() => {
        dispatch("setLogoutTimer", expiresIn);
        // display success message after route change completes
        dispatch("alert/success", "Login successful", { root: true });
      });

      router.push("/");
    } catch (error) {
      const errorMsg = error.response.data.errors[0].message;
      console.log(errorMsg);
      commit("loginFailure", errorMsg);
      dispatch("alert/error", errorMsg, { root: true });
    }
  },
  logout({ commit }) {
    userService.logout();
    commit("logout");
  },
};

export const account = {
  namespaced: true,
  state,
  mutations,
  actions,
};
