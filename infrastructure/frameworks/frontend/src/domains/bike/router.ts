import BikesPage from "@/domains/bike/pages/BikesPage.vue";
import BikePage from "@/domains/bike/pages/BikePage.vue";

const BikePageName = (baseName: string) => ({
  index: `${baseName}-index`,
  link: `${baseName}-link`
});

const BikeRoutes = () => [
  {
    path: "bike",
    name: BikePageName("bike").index,
    component: BikesPage,
    children: [
      {
        path: ":link",
        name: BikePageName("bike").link,
        component: BikePage,
        props: true
      }
    ]
  }
];

export default BikeRoutes;
