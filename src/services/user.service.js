// Insert backend api calls for performing CRUD operations on user data,
// as well as logging in and out of the example application.
import Vue from "vue";
import { userQuery } from "../graphql/user.query.js";
import router from "../router/index.js";
// import qs from "qs"

export const userService = {
  login,
  register,
  logout,
};

async function register(email, password, fullName, country) {
  const query = userQuery.register({ email, password, fullName, country });

  const config = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: query,
    url: process.env.VUE_APP_NODE_URL,
  };

  const res = await Vue.prototype.$http(config);
  // console.log(res.data.data);
  localStorage.setItem("tempUser", JSON.stringify(res.data.data.createUser.email));
  return res;
}

async function login(username, password) {
  const query = userQuery.login({ username, password });

  const config = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: query,
    url: process.env.VUE_APP_NODE_URL,
  };

  const res = await Vue.prototype.$http(config);
  if (res.data.data.login.token) {
    console.log(res.data.data);
    const data = {
      token: res.data.data.login.token,
      userId: res.data.data.login.userId,
      email: username,
    };

    // console.log(data);
    localStorage.setItem("user", JSON.stringify(data));
  }
  return res;
}

function logout() {
  localStorage.removeItem("user");
  router.replace("/login").catch((err) => {
    // Ignore the vuex err regarding  navigating to the page they are already on.
    if (
      err.name !== "NavigationDuplicated" &&
      !err.message.includes("Avoided redundant navigation to current location")
    ) {
      // But print any other errors to the console
      console.log(err);
    }
  });
}
