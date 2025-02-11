import BikesPage from "@/domains/bike/pages/BikesPage.vue";
import BikePage from "@/domains/bike/pages/BikePage.vue";
import RentPage from "@/domains/bike/pages/RentPage.vue";

const BikePageName = (baseName: string) => ({
  index: `${baseName}-index`,
  link: `${baseName}-link`,
  rent: `${baseName}-rent`
});

const BikeRoutes = () => [
  {
    path: "/bike", // Chemin parent
    name: BikePageName("bike").index,
    component: BikesPage,
    children: [
      {
        path: ":link", // Route dynamique pour les détails de la moto
        name: BikePageName("bike").link,
        component: BikePage,
        props: true
      }
    ]
  },
  {
    path: "/bike/rent", // Chemin absolu pour la page de location
    name: BikePageName("bike").rent,
    component: RentPage
  }
];

export default BikeRoutes;
