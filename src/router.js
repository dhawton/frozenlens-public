import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

//import AuthGuard from "./utils/AuthGuard";
import GuestOnly from "./utils/GuestOnly";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: GuestOnly
    }
  ]
});
