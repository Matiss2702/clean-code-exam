import { User, Gauge } from "lucide-vue-next";

import AdminDashboardPage from "@/domains/admin/pages/AdminDashboardPage.vue";
import AdminUserIndexPage from "@/domains/admin/pages/AdminUserIndexPage.vue";

const routePageName = (baseName: string) => ({
  index: `${baseName}-index`,
  dashbord: `${baseName}-dashboard`,
  users: `${baseName}-users`,
  addUser: `${baseName}-add-user`,
  editUser: `${baseName}-edit-user`,
  products: `${baseName}-products`,
  addProduct: `${baseName}-add-product`,
  editProduct: `${baseName}-edit-product`
});

const adminRoutes = () => [
  {
    path: "admin",
    name: routePageName("admin").index,
    component: () => import("@/layouts/AdminLayout.vue"),
    meta: {
      requiresAuth: true,
      icon: Gauge,
      position: 0
    },
    children: [
      {
        path: "dashboard",
        name: routePageName("admin").dashbord,
        component: AdminDashboardPage,
        meta: {
          requiresAuth: true,
          title: "Dashboard ",
          icon: Gauge,
          position: 1
        }
      },
      {
        path: "user",
        name: routePageName("admin").users,
        component: AdminUserIndexPage,
        meta: {
          requiresAuth: true,
          title: "Utilisateurs",
          icon: User,
          position: 2
        }
      }
    ]
  }
];

export default adminRoutes;
