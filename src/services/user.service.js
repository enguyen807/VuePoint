// Insert backend api calls for performing CRUD operations on user data,
// as well as logging in and out of the example application.
import Vue from "vue";
import { userQuery } from "../graphql/user.query.js";
import router from "../router/index.js";
// import qs from "qs"

export const userService = {
  login,
  register,
  verify,
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
  if (res.errors && res.status === 422) {
    throw new Error(
      "Validation failed. Make sure the email address isn't used yet!"
    );
  }
  if (res.errors) {
    throw new Error("User creation failed");
  }

  // console.log(res.data.data);
  localStorage.setItem(
    "tempUser",
    JSON.stringify(res.data.data.createUser.email)
  );
  return res;
}

async function verify(email) {
  const query = userQuery.verify({ email });

  const config = {
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: query,
    url: process.env.VUE_APP_NODE_URL,
  };

  const res = await Vue.prototype.$http(config);
  if (res.errors) {
    throw new Error("Email verification failed");
  }
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
  if (res.errors && res.status === 422) {
    throw new Error(
      "Validation failed. The email address or password does not match our records!"
    );
  }
  if (res.errors) {
    throw new Error("User login failed!");
  }

  if (res.data.data.login.token && res.data.data.login.isVerified === true) {
    const data = {
      token: res.data.data.login.token,
      userId: res.data.data.login.userId,
      email: username,
      isVerified: res.data.data.login.isVerified,
    };

    localStorage.setItem("user", JSON.stringify(data));
    localStorage.removeItem("tempUser");
  }
  localStorage.setItem("tempUser", username);
  return res;
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("tempUser");

  if (router.app._route.path !== "/login") router.push("/login");
}
