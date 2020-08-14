import { userService } from "../../services/user.service";
import router from "../../router/index";
import jwt_decode from "jwt-decode";

// https://blog.sqreen.com/authentication-best-practices-vue/
//https://jasonwatmore.com/post/2018/07/14/vue-vuex-user-registration-and-login-tutorial-example

// https://i.pinimg.com/originals/61/36/e5/6136e5a6e8ac3721b8cd65663aa6bee1.png
// https://community.adobe.com/t5/image/serverpage/image-id/66926i48EA523B914DC579/image-size/large?v=1.0&px=999
// https://segment.com/docs/segment-app/verify-email-address/

const user = JSON.parse(localStorage.getItem("user"));
let expiresIn = "";

if (user) {
  const user_token = user.token;

  const exp = jwt_decode(user_token).exp;
  const iat = jwt_decode(user_token).iat;
  expiresIn = (exp - iat) * 1000;
}

const state = user
  ? { status: { loggedIn: true, autoLogoutIn: expiresIn }, user }
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
  loginSuccess(state, payload) {
    state.status = { loggedIn: true, autoLogoutIn: payload.expiresIn };
    state.user = payload.user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  emailVerifyRequest(state) {
    state.status = { verifying: true }
  },
  emailVerifySuccess(state) {
    state.status = { emailVerifySuccess: true}
  },
  emailVerifyFailure(state) {
    state.status = { emailVerifyFailure: true }
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
};

const actions = {
  setLogoutTimer({ commit }) {
    setTimeout(() => {
      userService.logout();

      commit("logout");
      if (router.app._route.path !== "/login") router.push("/login");
    }, state.status.autoLogoutIn);
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
      console.log(res);
      commit("registerSuccess", res.data.data.createUser.email);
      setTimeout(() => {
        // display success message after route change completes
        dispatch(
          "alert/success",
          "Registration successful. A verification email has been sent to your email!",
          { root: true }
        );
      });

      return router.push("/verify-email");
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
      console.log(res)
      const user = {
        token: res.data.data.login.token,
        userId: res.data.data.login.userId,
        email: email,
        isVerified: res.data.data.login.isVerified,
      };
      const exp = jwt_decode(res.data.data.login.token).exp;
      const iat = jwt_decode(res.data.data.login.token).iat;
      const expiresIn = (exp - iat) * 1000;

      // console.log(res);
      // console.log(`exp: ${exp}`);
      // console.log(`iat: ${iat}`);
      // console.log(`expiresIn: ${expiresIn}`);

      if (res.data.data.login.isVerified === false) {
        commit("loginFailure", 'Please verify your email address');
        setTimeout(() => {
          // display success message after route change completes
          dispatch("alert/error", "Login failed. Please verify your email address", { root: true });
        });

        return router.push("/verify-email");
      }

      commit("loginSuccess", { user, expiresIn });

      setTimeout(() => {
        // display success message after route change completes
        dispatch("alert/success", "Login successful", { root: true });
      });

      return router.push("/");
    } catch (error) {
      console.log(error);
      const errorMsg = error.response.data.errors[0].message;
      console.log(errorMsg);
      commit("loginFailure", errorMsg);
      dispatch("alert/error", errorMsg, { root: true });
    }
  },
  async verify({dispatch, commit}, {email}) {
    commit("emailVerifyRequest", email);

    try {
      const res = await userService.verify(email);
      console.log(res);
      commit("emailVerifySuccess", email);
      setTimeout(() => {
        // display success message after route change completes
        dispatch(
          "alert/success",
          "Email Verification successful. A verification email has been sent to your email!",
          { root: true }
        );
      });

      return router.push("/login");
    } catch (error) {
      const errorMsg = error.response.data.errors[0].message;
      commit("emailVerifyFailure", errorMsg);
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
