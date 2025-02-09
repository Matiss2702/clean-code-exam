import { Router, RouterContext, RouterMiddleware } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { LicenceCategoryController } from "../controllers/LicenceCategoryController.ts";

// Définir les types de paramètres de route avec des paramètres de type appropriés
type CreateLicenceCategoryContext = RouterContext<"/licence-category", Record<string | number, string | undefined>>;
type GetLicenceCategoryContext = RouterContext<"/licence-category/:id", { id: string }>;
type GetAllLicenceCategoriesContext = RouterContext<"/licence-category", Record<string | number, string | undefined>>;

// Définir les types de middleware pour chaque route
type CreateLicenceCategoryMiddleware = RouterMiddleware<
  "/licence-category",
  Record<string | number, string | undefined>
>;
type GetLicenceCategoryMiddleware = RouterMiddleware<"/licence-category/:id", { id: string }>;
type GetAllLicenceCategoriesMiddleware = RouterMiddleware<
  "/licence-category",
  Record<string | number, string | undefined>
>;

const router = new Router();
let licenceCategoryController: LicenceCategoryController | null = null;

export function setLicenceCategoryController(controller: LicenceCategoryController) {
  licenceCategoryController = controller;
}

// Middleware pour s'assurer que le contrôleur est bien initialisé
const ensureLicenceCategoryControllerCreate: CreateLicenceCategoryMiddleware = async (ctx, next) => {
  if (!licenceCategoryController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "LicenceCategoryController non initialisé" };
    return;
  }
  await next();
};

const ensureLicenceCategoryControllerGet: GetLicenceCategoryMiddleware = async (ctx, next) => {
  if (!licenceCategoryController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "LicenceCategoryController non initialisé" };
    return;
  }
  await next();
};

const ensureLicenceCategoryControllerGetAll: GetAllLicenceCategoriesMiddleware = async (ctx, next) => {
  if (!licenceCategoryController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "LicenceCategoryController non initialisé" };
    return;
  }
  await next();
};

// Définition des routes avec les middlewares
router.post("/licence-category", ensureLicenceCategoryControllerCreate, async (ctx: CreateLicenceCategoryContext) => {
  console.log("➡️ Appel de createLicenceCategory()");
  await licenceCategoryController!.createLicenceCategory(ctx);
});

router.get("/licence-category/:id", ensureLicenceCategoryControllerGet, async (ctx: GetLicenceCategoryContext) => {
  console.log("➡️ Appel de getLicenceCategory()");
  await licenceCategoryController!.getLicenceCategory(ctx);
});

router.get("/licence-category", ensureLicenceCategoryControllerGetAll, async (ctx: GetAllLicenceCategoriesContext) => {
  console.log("➡️ Appel de getAllLicenceCategories()");
  await licenceCategoryController!.getAllLicenceCategories(ctx);
});

export default router;
