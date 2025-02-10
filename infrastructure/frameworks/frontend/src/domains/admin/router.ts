import { User, Gauge, Bike, Bookmark, Tag } from "lucide-vue-next";

import AdminDashboardPage from "@/domains/admin/pages/AdminDashboardPage.vue";
import AdminUserIndexPage from "@/domains/admin/pages/AdminUserIndexPage.vue";
import AdminBikeIndexPage from "@/domains/admin/pages/AdminBikeIndexPage.vue";
import AdminBrandIndexPage from "@/domains/admin/pages/AdminBrandIndexPage.vue";
import AdminModelIndexPage from "@/domains/admin/pages/AdminModelIndexPage.vue";
import AdminDriverLicenceIndexPage from "@/domains/admin/pages/AdminDriverLicenceIndexPage.vue";
import AdminLicenceCategoryIndexPage from "@/domains/admin/pages/AdminLicenceCategoryIndexPage.vue";
import path from "path";

const routePageName = (baseName: string) => ({
  index: `${baseName}-index`,
  dashbord: `${baseName}-dashboard`,
  users: `${baseName}-users`,
  addUser: `${baseName}-add-user`,
  editUser: `${baseName}-edit-user`,
  brandIndex: `${baseName}-brand-index`,
  brandAdd: `${baseName}-brand-add`,
  bikeIndex: `${baseName}-bike-index`,
  modelIndex: `${baseName}-model-index`,
  driverLicenceIndex: `${baseName}-driver-licence-index`,
  driverLicenceAdd: `${baseName}-driver-licence-add`,
  licenceCategoryIndex: `${baseName}-licence-category-index`
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
      },
      {
        path: "driver-licence",
        name: routePageName("admin").driverLicenceIndex,
        component: AdminDriverLicenceIndexPage,
        meta: {
          requiresAuth: true,
          title: "Permis de conduire",
          icon: Bookmark,
          position: 4
        }
      },
      {
        path: "driver-licence",
        name: routePageName("admin").driverLicenceIndex,
        component: AdminDriverLicenceIndexPage,
        meta: {
          requiresAuth: true,
          title: "Permis de conduire",
          icon: Bookmark,
          position: 4
        }
      },
      {
        path: "licence-category",
        name: routePageName("admin").licenceCategoryIndex,
        component: AdminLicenceCategoryIndexPage,
        meta: {
          requiresAuth: true,
          title: "Categories de permis",
          icon: Bookmark,
          position: 4
        }
      }
    ]
  }
];

export default adminRoutes;
