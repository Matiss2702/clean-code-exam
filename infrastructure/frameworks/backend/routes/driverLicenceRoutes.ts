import { Router, RouterContext, RouterMiddleware } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { DriverLicenceController } from "../controllers/DriverLicenceController.ts";

// Définir les types de paramètres de route avec des paramètres de type appropriés
type CreateDriverLicenceContext = RouterContext<"/driver-licence", Record<string | number, string | undefined>>;
type GetDriverLicencesContext = RouterContext<"/driver-licence/:userId", { userId: string }>;
type UpdateDriverLicenceContext = RouterContext<"/driver-licence/:id", { id: string }>;
type DeleteDriverLicenceContext = RouterContext<"/driver-licence/:id", { id: string }>;

// Définir les types de middleware pour chaque route
type CreateDriverLicenceMiddleware = RouterMiddleware<"/driver-licence", Record<string | number, string | undefined>>;
type GetDriverLicencesMiddleware = RouterMiddleware<"/driver-licence/:userId", { userId: string }>;
type UpdateDriverLicenceMiddleware = RouterMiddleware<"/driver-licence/:id", { id: string }>;
type DeleteDriverLicenceMiddleware = RouterMiddleware<"/driver-licence/:id", { id: string }>;

const router = new Router();
let driverLicenceController: DriverLicenceController | null = null;

export function setDriverLicenceController(controller: DriverLicenceController) {
  driverLicenceController = controller;
}

// Middleware pour s'assurer que le contrôleur est bien initialisé
const ensureDriverLicenceControllerCreate: CreateDriverLicenceMiddleware = async (ctx, next) => {
  if (!driverLicenceController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "DriverLicenceController non initialisé" };
    return;
  }
  await next();
};

const ensureDriverLicenceControllerGet: GetDriverLicencesMiddleware = async (ctx, next) => {
  if (!driverLicenceController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "DriverLicenceController non initialisé" };
    return;
  }
  await next();
};

const ensureDriverLicenceControllerUpdate: UpdateDriverLicenceMiddleware = async (ctx, next) => {
  if (!driverLicenceController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "DriverLicenceController non initialisé" };
    return;
  }
  await next();
};

const ensureDriverLicenceControllerDelete: DeleteDriverLicenceMiddleware = async (ctx, next) => {
  if (!driverLicenceController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "DriverLicenceController non initialisé" };
    return;
  }
  await next();
};

// Définition des routes avec les middlewares
router.post("/driver-licence", ensureDriverLicenceControllerCreate, async (ctx: CreateDriverLicenceContext) => {
  console.log("➡️ Appel de createDriverLicence()");
  await driverLicenceController!.createDriverLicence(ctx);
});

router.get("/driver-licence/:userId", ensureDriverLicenceControllerGet, async (ctx: GetDriverLicencesContext) => {
  console.log("➡️ Appel de getDriverLicences()");
  await driverLicenceController!.getDriverLicences(ctx);
});

router.put("/driver-licence/:id", ensureDriverLicenceControllerUpdate, async (ctx: UpdateDriverLicenceContext) => {
  console.log("➡️ Appel de updateDriverLicence()");
  await driverLicenceController!.updateDriverLicence(ctx);
});

router.delete("/driver-licence/:id", ensureDriverLicenceControllerDelete, async (ctx: DeleteDriverLicenceContext) => {
  console.log("➡️ Appel de deleteDriverLicence()");
  await driverLicenceController!.deleteDriverLicence(ctx);
});

export default router;
