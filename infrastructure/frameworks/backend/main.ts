import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import userRoutes, { setUserController } from "./routes/userRoutes.ts";
import brandRoutes, { setBrandController } from "./routes/brandRoutes.ts";

import { CreateUserUseCase } from "@application/user/usecases/CreateUserUseCase.ts";
import { LoginUserUseCase } from "@application/user/usecases/LoginUserUseCase.ts";
import { GetUserUseCase } from "@application/user/usecases/GetUserUseCase.ts";

import { CreateBrandUseCase } from "@application/brand/usecases/CreateBrandUseCase.ts";
import { GetBrandUseCase } from "@application/brand/usecases/GetBrandUseCase.ts";

import { UserPostgresMapper } from "@infrastructure/database/postgres/mapper/UserPostgresMapper.ts";
import { BrandPostgresMapper } from "@infrastructure/database/postgres/mapper/BrandPostgresMapper.ts";
import { AuthService } from "@infrastructure/services/AuthService.ts";
import { UuidAdapter } from "@infrastructure/adapters/UuidAdapter.ts";
import { PostgresConnection } from "@infrastructure/database/postgres/PostgresConnection.ts";

import { UserController } from "./controllers/UserController.ts";
import { BrandController } from "./controllers/BrandController.ts";

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

  const authService = new AuthService(JWT_SECRET);
  await authService.init();
  const uuidAdapter = new UuidAdapter();

  const createUserUC = new CreateUserUseCase(userRepository, authService, uuidAdapter);
  const loginUserUC = new LoginUserUseCase(userRepository, authService);
  const getUserUC = new GetUserUseCase(userRepository);

  const createBrandUC = new CreateBrandUseCase(brandRepository, uuidAdapter);
  const getBrandUC = new GetBrandUseCase(brandRepository);

  const userController = new UserController(createUserUC, loginUserUC, getUserUC);
  setUserController(userController);

  const brandController = new BrandController(createBrandUC, getBrandUC);
  setBrandController(brandController);

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

  app.use((ctx) => {
    ctx.response.body = "Hello from Deno Clean Architecture!";
  });

  console.log(`✅ Serveur démarré sur http://localhost:${BACKEND_PORT}`);
  await app.listen({ port: BACKEND_PORT });
}

await bootstrap();
