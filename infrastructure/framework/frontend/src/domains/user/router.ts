import UserProfilePage from "./pages/UserProfilePage.vue";

const routePageName = (baseName: string) => ({
  profile: `${baseName}-profile`,
});

const userRoutes = () => [
  {
    path: "/profile",
    name: routePageName("user").profile,
    component: UserProfilePage,
    meta: { requiresAuth: true },
  },
];

export default userRoutes;
