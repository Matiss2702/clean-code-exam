const routePageName = (baseName: string) => ({
  index: `${baseName}-index`
});

const homeRoutes = () => [
  {
    path: "/",
    name: routePageName("base").index,
    component: () => import("@/layouts/BaseLayout.vue"),
    children: []
  }
];

export default homeRoutes;
