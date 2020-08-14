import Vue from "vue";
import VueRouter from "vue-router";

// @ is an alias to /src removes the need of .vue extension
// ../components/VerifyEmailComponent

import Home from "@/views/Home";
import VerifyEmail from "@/views/User/Settings/VerifyEmail";
import Login from "@/views/Login";
import Register from "@/views/Register";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { requiresAuth: false },

  },
  {
    path: "/verify-email",
    name: "verifyemail",
    component: VerifyEmail,
    meta: { requiresAuth: false },

  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// Route Guard to prevent users from accessings home unless they have a verified email

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (!user) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } 
     if (user.isVerified === false) {
      console.log('user is not verified')
      next({
        path: "/verify-email",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
