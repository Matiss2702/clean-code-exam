import AuthPage from "./pages/AuthPage.vue";
import VerifyAccountPage from "./pages/VerifyAccountPage.vue";
import CheckMailPage from "./pages/CheckMailPage.vue";

const routePageName = (baseName: string) => ({
  auth: `${baseName}-auth`,
  verify: `${baseName}-verify`,
});

const authRoutes = () => [
  {
    path: "/auth",
    name: routePageName("auth").auth,
    component: AuthPage,
    props: true,
  },
  // {
  //   path: "/verify-account",
  //   name: "verify-account",
  //   component: VerifyAccountPage,
  //   props: true,
  //   meta: { requiresAuth: false },
  // },
  // {
  //   path: "/check-email",
  //   name: "check-email",
  //   component: CheckMailPage,
  //   props: true,
  //   meta: { requiresAuth: false },
  // },
];

export default authRoutes;
