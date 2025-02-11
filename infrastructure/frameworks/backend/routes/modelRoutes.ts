import { Router, RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { ModelController } from "../controllers/ModelController.ts";

type CreateModelContext = RouterContext<"/model", Record<string | number, string | undefined>>;
type GetModelContext = RouterContext<"/model/:id", { id: string }>;
type GetModelByLinkContext = RouterContext<"/model/link/:link", { link: string }>;
type UpdateModelContext = RouterContext<"/model/:id", { id: string }>;
type DeleteModelContext = RouterContext<"/model/:id", { id: string }>;

const router = new Router();
let modelController: ModelController | null = null;

export function setModelController(controller: ModelController) {
  modelController = controller;
}

const ensureModelControllerCreate = async (ctx, next) => {
  if (!modelController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "ModelController not initialized" };
    return;
  }
  await next();
};

const ensureModelControllerGet = async (ctx, next) => {
  if (!modelController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "ModelController not initialized" };
    return;
  }
  await next();
};

// Routes
router.post("/model", ensureModelControllerCreate, async (ctx: CreateModelContext) => {
  console.log("➡️ Appel de createModel()");
  await modelController!.createModel(ctx);
});

router.get("/model/:id", ensureModelControllerGet, async (ctx: GetModelContext) => {
  console.log("➡️ Appel de getModel()");
  await modelController!.getModel(ctx);
});

router.get("/model/link/:link", async (ctx: GetModelByLinkContext) => {
  console.log("➡️ Appel de getModelByLink()");
  await modelController!.getModelByLink(ctx);
});

router.get("/model", ensureModelControllerGet, async (ctx) => {
  console.log("➡️ Appel de getAllModels()");
  await modelController!.getAllModels(ctx);
});

router.put("/model/:id", ensureModelControllerGet, async (ctx: UpdateModelContext) => {
  console.log("➡️ Appel de updateModel()");
  await modelController!.updateModel(ctx);
});

router.delete("/model/:id", ensureModelControllerGet, async (ctx: DeleteModelContext) => {
  console.log("➡️ Appel de deleteModel()");
  await modelController!.deleteModel(ctx);
});

export default router;
