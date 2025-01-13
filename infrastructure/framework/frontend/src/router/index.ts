import { createRouter, createWebHistory } from "vue-router";
import homeRoutes from "@/domains/home/router";
import adminRoutes from "@/domains/admin/router";
import authRoutes from "@/domains/auth/router";
import userRoutes from "@/domains/user/router";
import { useAuthStore } from "@/stores/authStore";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/BaseLayout.vue"),
    children: [...homeRoutes(), ...adminRoutes(), ...authRoutes(), ...userRoutes()],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // console.log("Navigating to:", to.name, "with params:", to.params);
  // console.log("Auth Store State:", authStore.isAuthenticated, authStore.user);

  // const publicRoutes = ["verify-account", "auth"];

  // if (!publicRoutes.includes(to.name as string)) {
  //   if (!authStore.user && authStore.token) {
  //     await authStore.verifyTokenAndRole();
  //   }

  //   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
  //     return next({ name: "auth-login" });
  //   }

  //   if (to.meta.requiredRole && !authStore.hasRole(to.meta.requiredRole as string)) {
  //     return next({ name: "forbidden" });
  //   }
  // }

  return next();
});

export default router;
