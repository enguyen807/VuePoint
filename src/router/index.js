import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Verify from "../components/HelloWorld.vue";
import SignIn from "../components/SignInComponent.vue";
import SignUp from "../components/SignUpComponent.vue";

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
    component: SignIn,
  },
  {
    path: "/register",
    name: "register",
    component: SignUp,
  },
  {
    path: "/verify",
    name: "verifyEmail",
    component: Verify,
  },
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ["/login", "/register", "/verify"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("user");

//   console.log(authRequired)

//   if (authRequired && !loggedIn) {
//     return next("/login");
//   } else {next();}

//   
// });

// NOTE: Prevent users from accessings home unless they are verified 

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const loggedIn = localStorage.getItem("user");
    console.log(loggedIn)
    if (!loggedIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
