const routePageName = (baseName: string) => ({
  admin: `${baseName}-page`,
  users: `${baseName}-users`,
  addUser: `${baseName}-add-user`,
  editUser: `${baseName}-edit-user`,
  products: `${baseName}-products`,
  addProduct: `${baseName}-add-product`,
  editProduct: `${baseName}-edit-product`,
});

const routes = routePageName("admin");

const adminRoutes = () => [
  // Route pour la page d'administration principale
];

export default adminRoutes;
