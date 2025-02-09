import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import userRoutes, { setUserController } from "./routes/userRoutes.ts";
import brandRoutes, { setBrandController } from "./routes/brandRoutes.ts";
import bikeRoutes, { setBikeController } from "./routes/bikeRoutes.ts";
import bikeCategoryRoutes, { setBikeCategoryController } from "./routes/bikeCategoryRoutes.ts";
import bikeStatusRoutes, { setBikeStatusController } from "./routes/bikeStatusRoutes.ts";
import modelRoutes, { setModelController } from "./routes/modelRoutes.ts";

import { CreateUserUseCase } from "@application/user/usecases/CreateUserUseCase.ts";
import { LoginUserUseCase } from "@application/user/usecases/LoginUserUseCase.ts";
import { GetUserUseCase } from "@application/user/usecases/GetUserUseCase.ts";

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

import { UserPostgresMapper } from "@infrastructure/database/postgres/mapper/UserPostgresMapper.ts";
import { BrandPostgresMapper } from "@infrastructure/database/postgres/mapper/BrandPostgresMapper.ts";
import { BikePostgresMapper } from "@infrastructure/database/postgres/mapper/BikePostgresMapper.ts";
import { BikeCategoryPostgresMapper } from "@infrastructure/database/postgres/mapper/BikeCategoryPostgresMapper.ts";
import { BikeStatusPostgresMapper } from "@infrastructure/database/postgres/mapper/BikeStatusPostgresMapper.ts";
import { ModelPostgresMapper } from "@infrastructure/database/postgres/mapper/ModelPostgresMapper.ts";

import { AuthService } from "@infrastructure/services/AuthService.ts";
import { UuidAdapter } from "@infrastructure/adapters/UuidAdapter.ts";
import { PostgresConnection } from "@infrastructure/database/postgres/PostgresConnection.ts";

import { UserController } from "./controllers/UserController.ts";
import { BrandController } from "./controllers/BrandController.ts";
import { BikeController } from "./controllers/BikeController.ts";
import { BikeCategoryController } from "./controllers/BikeCategoryController.ts";
import { BikeStatusController } from "./controllers/BikeStatusController.ts";
import { ModelController } from "./controllers/ModelController.ts";

async function bootstrap() {
  const BACKEND_PORT = Number(Deno.env.get("BACKEND_PORT") ?? 3000);
  const JWT_SECRET = Deno.env.get("JWT_SECRET") ?? "fallback_secret";

  const dbConfig = {
    hostname: "db",
    port: 5432,
    user: Deno.env.get("POSTGRES_USER") ?? "postgres",
    password: Deno.env.get("POSTGRES_PASSWORD") ?? "postgres",
    database: Deno.env.get("POSTGRES_DB") ?? "mydb",
  };

  const postgresConnection = new PostgresConnection(dbConfig);
  await postgresConnection.connect();

  const client = postgresConnection.getClient();
  const result = await client.queryObject(`SELECT NOW() as current_time;`);
  console.log("✅ Connexion PostgreSQL réussie :", result.rows[0]);

  const userRepository = new UserPostgresMapper(postgresConnection);
  const brandRepository = new BrandPostgresMapper(postgresConnection);
  const bikeRepository = new BikePostgresMapper(postgresConnection);
  const bikeCategoryRepository = new BikeCategoryPostgresMapper(postgresConnection);
  const bikeStatusRepository = new BikeStatusPostgresMapper(postgresConnection);
  const modelRepository = new ModelPostgresMapper(postgresConnection);

  const authService = new AuthService(JWT_SECRET);
  await authService.init();
  const uuidAdapter = new UuidAdapter();

  const createUserUC = new CreateUserUseCase(userRepository, authService, uuidAdapter);
  const loginUserUC = new LoginUserUseCase(userRepository, authService);
  const getUserUC = new GetUserUseCase(userRepository);

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

  const userController = new UserController(createUserUC, loginUserUC, getUserUC);
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

  const app = new Application();

  app.use(
    oakCors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

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

  app.use((ctx) => {
    ctx.response.body = "Hello from Deno Clean Architecture!";
  });

  console.log(`✅ Serveur démarré sur http://localhost:${BACKEND_PORT}`);
  await app.listen({ port: BACKEND_PORT });
}

await bootstrap();
