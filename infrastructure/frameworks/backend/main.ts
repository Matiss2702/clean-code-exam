import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

// Import des routes
import userRoutes, { setUserController } from "./routes/userRoutes.ts";
import brandRoutes, { setBrandController } from "./routes/brandRoutes.ts";
import bikeRoutes, { setBikeController } from "./routes/bikeRoutes.ts";
import bikeCategoryRoutes, { setBikeCategoryController } from "./routes/bikeCategoryRoutes.ts";
import bikeStatusRoutes, { setBikeStatusController } from "./routes/bikeStatusRoutes.ts";
import modelRoutes, { setModelController } from "./routes/modelRoutes.ts";
import driverLicenceRoutes, { setDriverLicenceController } from "./routes/driverLicenceRoutes.ts";
import licenceCategoryRoutes, { setLicenceCategoryController } from "./routes/licenceCategoryRoutes.ts";

// Import des Use Cases (User)
import { CreateUserUseCase } from "@application/user/usecases/CreateUserUseCase.ts";
import { LoginUserUseCase } from "@application/user/usecases/LoginUserUseCase.ts";
import { GetUserUseCase } from "@application/user/usecases/GetUserUseCase.ts";
import { GetAllUsersUseCase } from "@application/user/usecases/GetAllUsersUseCase.ts";

// Import des Use Cases (Brand)
import { CreateBrandUseCase } from "@application/brand/usecases/CreateBrandUseCase.ts";
import { GetBrandUseCase } from "@application/brand/usecases/GetBrandUseCase.ts";

import { CreateBikeUseCase } from "@application/bike/usecases/CreateBikeUseCase.ts";
import { GetBikeUseCase } from "@application/bike/usecases/GetBikeUseCase.ts";

import { CreateBikeCategoryUseCase } from "@application/bikeCategory/usecases/CreateBikeCategoryUseCase.ts";
import { GetBikeCategoryUseCase } from "@application/bikeCategory/usecases/GetBikeCategoryUseCase.ts";

import { CreateBikeStatusUseCase } from "@application/bikeStatus/usecases/CreateBikeStatusUseCase.ts";
import { GetBikeStatusUseCase } from "@application/bikeStatus/usecases/GetBikeStatutsUseCase.ts";

import { CreateModelUseCase } from "@application/model/usecases/CreateModelUseCase.ts";
import { GetModelUseCase } from "@application/model/usecases/GetModelUseCase.ts";

import { BikePostgresMapper } from "@infrastructure/database/postgres/mapper/BikePostgresMapper.ts";
import { BikeCategoryPostgresMapper } from "@infrastructure/database/postgres/mapper/BikeCategoryPostgresMapper.ts";
import { BikeStatusPostgresMapper } from "@infrastructure/database/postgres/mapper/BikeStatusPostgresMapper.ts";
import { ModelPostgresMapper } from "@infrastructure/database/postgres/mapper/ModelPostgresMapper.ts";

// Import des Use Cases (Driver Licence)
import { CreateDriverLicenceUseCase } from "@application/user/usecases/CreateDriverLicenceUseCase.ts";
import { GetDriverLicencesUseCase } from "@application/user/usecases/GetDriverLicencesUseCase.ts";
import { UpdateDriverLicenceUseCase } from "@application/user/usecases/UpdateDriverLicenceUseCase.ts";
import { DeleteDriverLicenceUseCase } from "@application/user/usecases/DeleteDriverLicenceUseCase.ts";

// Import des Use Cases (Licence Category)
import { CreateLicenceCategoriesUseCase } from "@application/user/usecases/CreateLicenceCategoriesUseCase.ts";
import { GetLicenceCategoryUseCase } from "@application/user/usecases/GetLicenceCategoryUseCase.ts";
import { GetAllLicenceCategoriesUseCase } from "@application/user/usecases/GetAllLicenceCategoriesUseCase.ts";
import { UpdateLicenceCategoryUseCase } from "@application/user/usecases/UpdateLicenceCategoryUseCase.ts";
import { DeleteLicenceCategoryUseCase } from "@application/user/usecases/DeleteLicenceCategoryUseCase.ts";

// Import des Repositories
import { UserPostgresMapper } from "@infrastructure/database/postgres/mapper/UserPostgresMapper.ts";
import { BrandPostgresMapper } from "@infrastructure/database/postgres/mapper/BrandPostgresMapper.ts";
import { DriverLicencePostgresMapper } from "@infrastructure/database/postgres/mapper/DriverLicencePostgresMapper.ts";
import { LicenceCategoryPostgresMapper } from "@infrastructure/database/postgres/mapper/LicenceCategoryPostgresMapper.ts";

// Import des services et adaptateurs
import { AuthService } from "@infrastructure/services/AuthService.ts";
import { UuidAdapter } from "@infrastructure/adapters/UuidAdapter.ts";
import { PostgresConnection } from "@infrastructure/database/postgres/PostgresConnection.ts";

// Import des contrôleurs
import { UserController } from "./controllers/UserController.ts";
import { BrandController } from "./controllers/BrandController.ts";
import { BikeController } from "./controllers/BikeController.ts";
import { BikeCategoryController } from "./controllers/BikeCategoryController.ts";
import { BikeStatusController } from "./controllers/BikeStatusController.ts";
import { ModelController } from "./controllers/ModelController.ts";
import { DriverLicenceController } from "./controllers/DriverLicenceController.ts";
import { LicenceCategoryController } from "./controllers/LicenceCategoryController.ts";

async function api() {
  // Récupération des variables d'environnement
  const BACKEND_PORT = Number(Deno.env.get("BACKEND_PORT") ?? 3000);
  const JWT_SECRET = Deno.env.get("JWT_SECRET") ?? "fallback_secret";

  // Configuration de la connexion à PostgreSQL
  const dbConfig = {
    hostname: "db",
    port: 5432,
    user: Deno.env.get("POSTGRES_USER") ?? "postgres",
    password: Deno.env.get("POSTGRES_PASSWORD") ?? "postgres",
    database: Deno.env.get("POSTGRES_DB") ?? "mydb",
  };

  // Connexion à PostgreSQL
  const postgresConnection = new PostgresConnection(dbConfig);
  await postgresConnection.connect();

  // Vérification de la connexion PostgreSQL
  const client = postgresConnection.getClient();
  const result = await client.queryObject(`SELECT NOW() as current_time;`);
  console.log("✅ Connexion PostgreSQL réussie :", result.rows[0]);

  // Initialisation des repositories
  const userRepository = new UserPostgresMapper(postgresConnection);
  const brandRepository = new BrandPostgresMapper(postgresConnection);
  const bikeRepository = new BikePostgresMapper(postgresConnection);
  const bikeCategoryRepository = new BikeCategoryPostgresMapper(postgresConnection);
  const bikeStatusRepository = new BikeStatusPostgresMapper(postgresConnection);
  const modelRepository = new ModelPostgresMapper(postgresConnection);
  const driverLicenceRepository = new DriverLicencePostgresMapper(postgresConnection);
  const licenceCategoryRepository = new LicenceCategoryPostgresMapper(postgresConnection);

  // Initialisation des services et adaptateurs
  const authService = new AuthService(JWT_SECRET);
  await authService.init();
  const uuidAdapter = new UuidAdapter();

  // Initialisation des Use Cases (User)
  const createUserUC = new CreateUserUseCase(userRepository, authService, uuidAdapter);
  const loginUserUC = new LoginUserUseCase(userRepository, authService);
  const getUserUC = new GetUserUseCase(userRepository);
  const getAllUsersUC = new GetAllUsersUseCase(userRepository);

  // Initialisation des Use Cases (Brand)
  const createBrandUC = new CreateBrandUseCase(brandRepository, uuidAdapter);
  const getBrandUC = new GetBrandUseCase(brandRepository);

  const createBikeUC = new CreateBikeUseCase(bikeRepository, uuidAdapter);
  const getBikeUC = new GetBikeUseCase(bikeRepository);

  const createBikeCategoryUC = new CreateBikeCategoryUseCase(bikeCategoryRepository, uuidAdapter);
  const getBikeCategoryUC = new GetBikeCategoryUseCase(bikeCategoryRepository);

  const createBikeStatusUC = new CreateBikeStatusUseCase(bikeStatusRepository, uuidAdapter);
  const getBikeStatusUC = new GetBikeStatusUseCase(bikeStatusRepository);

  const createModelUC = new CreateModelUseCase(modelRepository, uuidAdapter);
  const getModelUC = new GetModelUseCase(modelRepository);

  const userController = new UserController(createUserUC, loginUserUC, getUserUC, getAllUsersUC);
  // Initialisation des Use Cases (Driver Licence)
  const createDriverLicenceUC = new CreateDriverLicenceUseCase(driverLicenceRepository);
  const getDriverLicencesUC = new GetDriverLicencesUseCase(driverLicenceRepository);
  const updateDriverLicenceUC = new UpdateDriverLicenceUseCase(driverLicenceRepository);
  const deleteDriverLicenceUC = new DeleteDriverLicenceUseCase(driverLicenceRepository);

  // Initialisation des Use Cases (Licence Category)
  const createLicenceCategoryUC = new CreateLicenceCategoriesUseCase(licenceCategoryRepository);
  const getLicenceCategoryUC = new GetLicenceCategoryUseCase(licenceCategoryRepository);
  const getAllLicenceCategoriesUC = new GetAllLicenceCategoriesUseCase(licenceCategoryRepository);
  const updateLicenceCategoryUC = new UpdateLicenceCategoryUseCase(licenceCategoryRepository);
  const deleteLicenceCategoryUC = new DeleteLicenceCategoryUseCase(licenceCategoryRepository);

  // Initialisation des contrôleurs
  setUserController(userController);

  const brandController = new BrandController(createBrandUC, getBrandUC);
  setBrandController(brandController);

  const bikeController = new BikeController(createBikeUC, getBikeUC);
  setBikeController(bikeController);

  const bikeCategoryController = new BikeCategoryController(createBikeCategoryUC, getBikeCategoryUC);
  setBikeCategoryController(bikeCategoryController);

  const bikeStatusController = new BikeStatusController(createBikeStatusUC, getBikeStatusUC);
  setBikeStatusController(bikeStatusController);

  const modelController = new ModelController(createModelUC, getModelUC);
  setModelController(modelController);

  const driverLicenceController = new DriverLicenceController(
    createDriverLicenceUC,
    getDriverLicencesUC,
    updateDriverLicenceUC,
    deleteDriverLicenceUC,
    getUserUC
  );
  setDriverLicenceController(driverLicenceController);

  const licenceCategoryController = new LicenceCategoryController(
    createLicenceCategoryUC,
    getLicenceCategoryUC,
    getAllLicenceCategoriesUC,
    updateLicenceCategoryUC,
    deleteLicenceCategoryUC
  );
  setLicenceCategoryController(licenceCategoryController);

  // Création de l'application Oak
  const app = new Application();

  // Configuration des CORS
  app.use(
    oakCors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Ajout des routes
  app.use(userRoutes.routes());
  app.use(userRoutes.allowedMethods());
  app.use(brandRoutes.routes());
  app.use(brandRoutes.allowedMethods());
  app.use(bikeRoutes.routes());
  app.use(bikeRoutes.allowedMethods());
  app.use(bikeCategoryRoutes.routes());
  app.use(bikeCategoryRoutes.allowedMethods());
  app.use(bikeStatusRoutes.routes());
  app.use(bikeStatusRoutes.allowedMethods());
  app.use(modelRoutes.routes());
  app.use(modelRoutes.allowedMethods());
  app.use(driverLicenceRoutes.routes());
  app.use(driverLicenceRoutes.allowedMethods());
  app.use(licenceCategoryRoutes.routes());
  app.use(licenceCategoryRoutes.allowedMethods());

  // Route par défaut
  app.use((ctx) => {
    ctx.response.body = "Hello from Deno Clean Architecture!";
  });

  // Démarrer le serveur
  console.log(`✅ Serveur démarré sur http://localhost:${BACKEND_PORT}`);
  await app.listen({ port: BACKEND_PORT });
}

// Lancer l'application
await api();
