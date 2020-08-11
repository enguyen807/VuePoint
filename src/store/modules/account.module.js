import { userService } from "../../services/user.service";
import router from "../../router/index";
import jwt_decode from "jwt-decode";

// https://blog.sqreen.com/authentication-best-practices-vue/
//https://jasonwatmore.com/post/2018/07/14/vue-vuex-user-registration-and-login-tutorial-example

// https://i.pinimg.com/originals/61/36/e5/6136e5a6e8ac3721b8cd65663aa6bee1.png
// https://community.adobe.com/t5/image/serverpage/image-id/66926i48EA523B914DC579/image-size/large?v=1.0&px=999
// https://segment.com/docs/segment-app/verify-email-address/

const user = JSON.parse(localStorage.getItem("user"));

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
      console.log(res)
      commit("registerSuccess", res.data.data.createUser.email);
      setTimeout(() => {
        // display success message after route change completes
        dispatch(
          "alert/success",
          "Registration successful. A verification email has been sent to your email.",
          { root: true }
        );
      });

      router.push('/verify');
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
      commit("loginSuccess", { email });

      const exp = jwt_decode(res.data.data.login.token).exp;
      const iat = jwt_decode(res.data.data.login.token).iat;

      const expiresIn = (exp - iat) * 1000;

      setTimeout(() => {
        dispatch("setLogoutTimer", expiresIn);
        // display success message after route change completes
        dispatch("alert/success", "Login successful", { root: true });
      });

      router.push("/");
    } catch (error) {
      console.log(error);
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
