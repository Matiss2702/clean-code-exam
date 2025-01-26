import AuthPage from "./pages/AuthPage.vue";

const routePageName = (baseName: string) => ({
  index: `${baseName}-index`,
  login: `${baseName}-login`,
  register: `${baseName}-register`,
  verify: `${baseName}-verify`
});

const authRoutes = () => [
  {
    path: "/auth",
    name: routePageName("auth").index,
    component: () => import("@/layouts/AuthLayout.vue"),
    meta: {
      requiresAuth: false,
      showHeader: false
    },
    children: [
      {
        path: "login",
        name: routePageName("auth").login,
        component: AuthPage,
        props: {
          title: "Se connecter"
        },
        meta: {
          requiresAuth: false,
          showHeader: false
        }
      },
      {
        path: "register",
        name: routePageName("auth").register,
        component: AuthPage,
        props: {
          title: "S'inscrire"
        },
        meta: {
          requiresAuth: false,
          showHeader: false
        }
      }
    ]
  }
];

export default authRoutes;
