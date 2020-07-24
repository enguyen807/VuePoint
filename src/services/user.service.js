// Insert backend api calls for performing CRUD operations on user data,
// as well as logging in and out of the example application.
import axios from "axios";
import { userQuery } from "../graphql/user.query.js";
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

  const res = await axios(config);
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

  const res = await axios(config);
  if (res.data.data.login.token) {
    console.log(res.data.data);
    localStorage.setItem("user", JSON.stringify(res.data.data.login));
  }
  return res;
}

function logout() {
  localStorage.removeItem("user");
}
