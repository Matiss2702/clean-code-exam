import bikeRoutes from "@/domains/bike/router";
import brandRoutes from "@/domains/brand/router";

const routePageName = (baseName: string) => ({
  index: `${baseName}-index`
});

const homeRoutes = () => [
  {
    path: "/",
    name: routePageName("base").index,
    component: () => import("@/layouts/BaseLayout.vue"),
    children: [...brandRoutes(), ...bikeRoutes()]
  }
];

export default homeRoutes;
