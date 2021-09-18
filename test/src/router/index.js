import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component:resolve => require(['@pages/login'], resolve),
      meta:{
        hideHeader:true
      }
    },
    {
      path: "/project/dynamic-route/:id",
      name: "DynamicRoute",
      component:resolve => require(['@pages/project/dynamic-route'], resolve),
      meta:{
        hideHeader:true
      }
    }
  ]
});
