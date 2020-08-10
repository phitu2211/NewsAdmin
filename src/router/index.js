import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import ListAccount from "@/components/Account/ListAccount";
import ListMenu from "@/components/Menu/ListMenu";
import ListNews from "@/components/News/ListNews";
import CreateNews from "@/components/News/CreateNews";
import EditNews from "@/components/News/EditNews";
import ListCategory from "@/components/Category/ListCategory";
import ListRole from "@/components/Role/ListRole";
import CreateAccount from "@/components/Account/CreateAccount";
import LoginPage from "@/components/LoginPage";
import Log from "@/components/Log/Log";
import RegisterPage from "@/components/RegisterPage";
import AccessDeny from "@/components/AccessDeny";
import NotFound from "@/components/404NotFound";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: { authorize: ["Admin", "User", "Manager"] }
    },
    {
      path: "/news",
      name: "ListNews",
      component: ListNews,
      meta: { authorize: ["Admin", "Manager"] }
    },
    {
      path: "/news/create",
      name: "CreateNews",
      component: CreateNews,
      meta: { authorize: ["Admin", "Manager"] }
    },
    {
      path: "/news/edit/:id",
      name: "EditNews",
      component: EditNews,
      meta: { authorize: ["Admin", "Manager"] }
    },
    {
      path: "/category",
      name: "Category",
      component: ListCategory,
      meta: { authorize: ["Admin", "Manager"] }
    },
    {
      path: "/account",
      name: "ListAccount",
      component: ListAccount,
      meta: { authorize: ["Admin", "Manager"] }
    },
    {
      path: "/account/create",
      name: "CreateAccount",
      component: CreateAccount,
      meta: { authorize: ["Admin", "Manager"] }
    },
    {
      path: "/menu",
      name: "ListMenu",
      component: ListMenu,
      meta: { authorize: ["Admin", "Manager"] }
    },
    {
      path: "/role",
      name: "Role",
      component: ListRole,
      meta: { authorize: ["Admin", "Manager"] }
    },
    {
      path: "/log",
      name: "Log",
      component: Log,
      meta: { authorize: ["Admin"] }
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterPage
    },
    {
      path: "/deny",
      name: "Deny",
      component: AccessDeny
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  if (user && authorize) {
    let roles = JSON.parse(user).role;
    const isInRole = authorize.filter(r => roles.includes(r) > 0).length > 0;
    if (!isInRole) {
      return next("/deny");
    }
  }

  next();
});

export default router;
