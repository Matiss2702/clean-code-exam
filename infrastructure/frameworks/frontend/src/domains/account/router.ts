import { Bike, User } from "lucide-vue-next";

import UserProfilePage from "@/domains/account/pages/UserProfilePage.vue";
import UserRentPage from "@/domains/account/pages/UserRentPage.vue";
import DriverLicencePage from "@/domains/account/pages/DriverLicencePage.vue";

const routePageName = (baseName: string) => ({
  index: `${baseName}-index`,
  profile: `${baseName}-profile`,
  rent: `${baseName}-rent`,
  licence: `${baseName}-licence`
});

const userRoutes = () => [
  {
    path: "/account",
    name: "account",
    component: () => import("@/layouts/AccountLayout.vue"),
    meta: {
      requiresAuth: true,
      title: "Mon compte"
    },
    children: [
      {
        path: "profile",
        name: routePageName("user").profile,
        component: UserProfilePage,
        meta: {
          requiresAuth: true,
          title: "Profile",
          icon: User,
          position: 1
        }
      },
      {
        path: "rent",
        name: routePageName("user").rent,
        component: UserRentPage,
        meta: {
          requiresAuth: true,
          title: "Locations",
          icon: Bike,
          position: 1
        }
      },
      {
        path: "licence",
        name: routePageName("user").licence,
        component: DriverLicencePage,
        meta: {
          requiresAuth: true,
          title: "Licences",
          icon: Bike,
          position: 2
        }
      }
    ]
  }
];

export default userRoutes;
