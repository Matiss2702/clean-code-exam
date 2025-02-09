import { User, Gauge, Bike, Bookmark, Tag } from "lucide-vue-next";

import AdminDashboardPage from "@/domains/admin/pages/AdminDashboardPage.vue";
import AdminUserIndexPage from "@/domains/admin/pages/AdminUserIndexPage.vue";
import AdminBikeIndexPage from "@/domains/admin/pages/AdminBikeIndexPage.vue";
import AdminBrandIndexPage from "@/domains/admin/pages/AdminBrandIndexPage.vue";
import AdminModelIndexPage from "@/domains/admin/pages/AdminModelIndexPage.vue";

const routePageName = (baseName: string) => ({
  index: `${baseName}-index`,
  dashbord: `${baseName}-dashboard`,
  users: `${baseName}-users`,
  addUser: `${baseName}-add-user`,
  editUser: `${baseName}-edit-user`,
  brandIndex: `${baseName}-brand-index`,
  bikeIndex: `${baseName}-bike-index`,
  modelIndex: `${baseName}-model-index`
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
        path: "model",
        name: routePageName("admin").modelIndex,
        component: AdminModelIndexPage,
        meta: {
          requiresAuth: true,
          title: "Modèles",
          icon: Tag,
          position: 3
        }
      },
      {
        path: "bike",
        name: routePageName("admin").bikeIndex,
        component: AdminBikeIndexPage,
        meta: {
          requiresAuth: true,
          title: "Motos",
          icon: Bike,
          position: 4
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
          position: 5
        }
      }
    ]
  }
];

export default adminRoutes;
