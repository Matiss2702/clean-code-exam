import BrandsPage from "@/domains/brand/pages/BrandsPage.vue";
import BrandPage from "@/domains/brand/pages/BrandPage.vue";

const BrandPageName = (baseName: string) => ({
  index: `${baseName}-index`,
  link: `${baseName}-link`
});

const brandRoutes = () => [
  {
    path: "brand",
    name: BrandPageName("brand").index,
    component: BrandsPage,
    children: [
      {
        path: ":link",
        name: BrandPageName("brand").link,
        component: BrandPage,
        props: true
      }
    ]
  }
];

export default brandRoutes;
