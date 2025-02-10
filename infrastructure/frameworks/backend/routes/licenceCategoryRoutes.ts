import { Router, RouterContext, RouterMiddleware } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { LicenceCategoryController } from "../controllers/LicenceCategoryController.ts";

// Types de route pour Oak
type CreateLicenceCategoryContext = RouterContext<"/licence-category", Record<string | number, string | undefined>>;
type GetLicenceCategoryContext = RouterContext<"/licence-category/:id", { id: string }>;
type GetAllLicenceCategoriesContext = RouterContext<"/licence-category", Record<string | number, string | undefined>>;
type UpdateLicenceCategoryContext = RouterContext<"/licence-category/:id", { id: string }>;
type DeleteLicenceCategoryContext = RouterContext<"/licence-category/:id", { id: string }>;

// Middlewares Oak
type CreateLicenceCategoryMiddleware = RouterMiddleware<"/licence-category">;
type GetLicenceCategoryMiddleware = RouterMiddleware<"/licence-category/:id", { id: string }>;
type GetAllLicenceCategoriesMiddleware = RouterMiddleware<"/licence-category">;
type UpdateLicenceCategoryMiddleware = RouterMiddleware<"/licence-category/:id", { id: string }>;
type DeleteLicenceCategoryMiddleware = RouterMiddleware<"/licence-category/:id", { id: string }>;

const router = new Router();
let licenceCategoryController: LicenceCategoryController | null = null;

export function setLicenceCategoryController(controller: LicenceCategoryController) {
  licenceCategoryController = controller;
}

// Middlewares pour s'assurer que le controller est initialisé
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

const ensureLicenceCategoryControllerUpdate: UpdateLicenceCategoryMiddleware = async (ctx, next) => {
  if (!licenceCategoryController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "LicenceCategoryController non initialisé" };
    return;
  }
  await next();
};

const ensureLicenceCategoryControllerDelete: DeleteLicenceCategoryMiddleware = async (ctx, next) => {
  if (!licenceCategoryController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "LicenceCategoryController non initialisé" };
    return;
  }
  await next();
};

// Routes
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

// Optionnel : PUT et DELETE
router.put(
  "/licence-category/:id",
  ensureLicenceCategoryControllerUpdate,
  async (ctx: UpdateLicenceCategoryContext) => {
    console.log("➡️ Appel de updateLicenceCategory()");
    await licenceCategoryController!.updateLicenceCategory(ctx);
  }
);

router.delete(
  "/licence-category/:id",
  ensureLicenceCategoryControllerDelete,
  async (ctx: DeleteLicenceCategoryContext) => {
    console.log("➡️ Appel de deleteLicenceCategory()");
    await licenceCategoryController!.deleteLicenceCategory(ctx);
  }
);

export default router;
