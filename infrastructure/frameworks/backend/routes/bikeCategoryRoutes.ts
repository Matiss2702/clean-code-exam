import { Router, RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { BikeCategoryController } from "../controllers/BikeCategoryController.ts";

type CreateBikeCategoryContext = RouterContext<"/bike-category", Record<string | number, string | undefined>>;
type GetBikeCategoryContext = RouterContext<"/bike-category/:id", { id: string }>;
type GetBikeCategoryByNameContext = RouterContext<"/bike-category/name/:name", { name: string }>;
type UpdateBikeCategoryContext = RouterContext<"/bike-category/:id", { id: string }>;
type DeleteBikeCategoryContext = RouterContext<"/bike-category/:id", { id: string }>;

const router = new Router();
let bikeCategoryController: BikeCategoryController | null = null;

export function setBikeCategoryController(controller: BikeCategoryController) {
  bikeCategoryController = controller;
}

const ensureBikeCategoryController = async (ctx, next) => {
  if (!bikeCategoryController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "BikeCategoryController not initialized" };
    return;
  }
  await next();
};

// Routes
router.post("/bike-category", ensureBikeCategoryController, async (ctx: CreateBikeCategoryContext) => {
  console.log("➡️ Appel de createBikeCategory()");
  await bikeCategoryController!.createBikeCategory(ctx);
});

router.get("/bike-category", ensureBikeCategoryController, async (ctx: GetBikeCategoryContext) => {
  console.log("➡️ Appel de getAllBikeCategories()");
  await bikeCategoryController!.getAllBikeCategories(ctx);
});

router.get("/bike-category/:id", ensureBikeCategoryController, async (ctx: GetBikeCategoryContext) => {
  console.log("➡️ Appel de getBikeCategory()");
  await bikeCategoryController!.getBikeCategory(ctx);
});

router.get("/bike-category/name/:name", ensureBikeCategoryController, async (ctx: GetBikeCategoryByNameContext) => {
  console.log("➡️ Appel de getBikeCategoryByName()");
  await bikeCategoryController!.getBikeCategoryByName(ctx);
});

router.put("/bike-category/:id", ensureBikeCategoryController, async (ctx: UpdateBikeCategoryContext) => {
  console.log("➡️ Appel de updateBikeCategory()");
  await bikeCategoryController!.updateBikeCategory(ctx);
});

router.delete("/bike-category/:id", ensureBikeCategoryController, async (ctx: DeleteBikeCategoryContext) => {
  console.log("➡️ Appel de deleteBikeCategory()");
  await bikeCategoryController!.deleteBikeCategory(ctx);
});

export default router;
