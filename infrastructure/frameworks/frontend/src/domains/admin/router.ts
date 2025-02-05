import { User, Gauge, Bike, Bookmark } from "lucide-vue-next";

import AdminDashboardPage from "@/domains/admin/pages/AdminDashboardPage.vue";
import AdminUserIndexPage from "@/domains/admin/pages/AdminUserIndexPage.vue";
import AdminMotorcycleIndexPage from "@/domains/admin/pages/AdminMotorcycleIndexPage.vue";
import AdminBrandIndexPage from "@/domains/admin/pages/AdminBrandIndexPage.vue";
import path from "path";

const routePageName = (baseName: string) => ({
  index: `${baseName}-index`,
  dashbord: `${baseName}-dashboard`,
  users: `${baseName}-users`,
  addUser: `${baseName}-add-user`,
  editUser: `${baseName}-edit-user`,
  motorcycleIndex: `${baseName}-motorcycle-index`,
  brandIndex: `${baseName}-brand-index`,
  brandAdd: `${baseName}-brand-add`
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
      },
      {
        path: "motorcycle",
        name: routePageName("admin").motorcycleIndex,
        component: AdminMotorcycleIndexPage,
        meta: {
          requiresAuth: true,
          title: "Motos",
          icon: Bike,
          position: 3
        }
      },
      {
        path: "brand",
        name: routePageName("admin").brandIndex,
        component: AdminBrandIndexPage,
        meta: {
          requiresAuth: true,
          title: "Marques",
          icon: Bookmark,
          position: 4
        }
      }
    ]
  }
];

export default adminRoutes;
