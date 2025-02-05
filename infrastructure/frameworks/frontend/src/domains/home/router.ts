import motorcycleRoutes from "@/domains/motorcycle/router";
import brandRoutes from "@/domains/brand/router";

const routePageName = (baseName: string) => ({
  index: `${baseName}-index`
});

const homeRoutes = () => [
  {
    path: "/",
    name: routePageName("base").index,
    component: () => import("@/layouts/BaseLayout.vue"),
    children: [...brandRoutes(), ...motorcycleRoutes()]
  }
];

export default homeRoutes;
