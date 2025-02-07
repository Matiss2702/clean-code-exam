import MotorcyclePage from "@/domains/motorcycle/pages/MotorcyclePage.vue";

const MotorcyclePageName = (baseName: string) => ({
  index: `${baseName}-index`,
  id: `${baseName}-id`
});

const motorcycleRoutes = () => [
  {
    path: "motorcycle",
    name: MotorcyclePageName("motorcycle").index,
    component: MotorcyclePage,
    children: [
      {
        path: ":id",
        name: MotorcyclePageName("motorcycles").id,
        component: () => import("@/layouts/BaseLayout.vue"),
        children: []
      }
    ]
  }
];

export default motorcycleRoutes;
