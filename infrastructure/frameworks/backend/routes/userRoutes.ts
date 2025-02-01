import { Router, RouterContext, RouterMiddleware } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { UserController } from "../controllers/UserController.ts";

// Définir des types de paramètres de route spécifiques avec des paramètres de type appropriés
type RegisterContext = RouterContext<"/register", Record<string | number, string | undefined>>;
type LoginContext = RouterContext<"/login", Record<string | number, string | undefined>>;
type GetUserContext = RouterContext<"/users/:id", { id: string }>;

// Définir les types de middleware pour chaque route
type RegisterMiddleware = RouterMiddleware<"/register", Record<string | number, string | undefined>>;
type LoginMiddleware = RouterMiddleware<"/login", Record<string | number, string | undefined>>;
type GetUserMiddleware = RouterMiddleware<"/users/:id", { id: string }>;

const router = new Router();
let userController: UserController | null = null;

export function setUserController(controller: UserController) {
  userController = controller;
}

// Middleware for specific routes
const ensureUserControllerRegister: RegisterMiddleware = async (ctx, next) => {
  if (!userController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "UserController non initialisé" };
    return;
  }
  await next();
};

const ensureUserControllerLogin: LoginMiddleware = async (ctx, next) => {
  if (!userController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "UserController non initialisé" };
    return;
  }
  await next();
};

const ensureUserControllerGetUser: GetUserMiddleware = async (ctx, next) => {
  if (!userController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "UserController non initialisé" };
    return;
  }
  await next();
};

router.post("/register", ensureUserControllerRegister, async (ctx: RegisterContext) => {
  console.log("➡️ Appel de createUser()");
  await userController!.createUser(ctx);
});

router.post("/login", ensureUserControllerLogin, async (ctx: LoginContext) => {
  console.log("➡️ Appel de loginUser()");
  await userController!.loginUser(ctx);
});

router.get("/users/:id", ensureUserControllerGetUser, async (ctx: GetUserContext) => {
  console.log("➡️ Appel de getUser()");
  await userController!.getUser(ctx);
});

export default router;
