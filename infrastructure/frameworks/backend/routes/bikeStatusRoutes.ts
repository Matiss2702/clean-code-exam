import { Router, RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { BikeStatusController } from "../controllers/BikeStatusController.ts";

type CreateBikeStatusContext = RouterContext<"/bike-status", Record<string | number, string | undefined>>;
type GetBikeStatusContext = RouterContext<"/bike-status/:id", { id: string }>;
type GetBikeStatusByNameContext = RouterContext<"/bike-status/name/:name", { name: string }>;
type UpdateBikeStatusContext = RouterContext<"/bike-status/:id", { id: string }>;
type DeleteBikeStatusContext = RouterContext<"/bike-status/:id", { id: string }>;

const router = new Router();
let bikeStatusController: BikeStatusController | null = null;

export function setBikeStatusController(controller: BikeStatusController) {
  bikeStatusController = controller;
}

const ensureBikeStatusController = async (ctx, next) => {
  if (!bikeStatusController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "BikeStatusController not initialized" };
    return;
  }
  await next();
};

// Routes
router.post("/bike-status", ensureBikeStatusController, async (ctx: CreateBikeStatusContext) => {
  console.log("➡️ Appel de createBikeStatus()");
  await bikeStatusController!.createBikeStatus(ctx);
});

router.get("/bike-status", ensureBikeStatusController, async (ctx: GetBikeStatusContext) => {
  console.log("➡️ Appel de getAllBikeStatus()");
  await bikeStatusController!.getAllBikeStatus(ctx);
});

router.get("/bike-status/:id", ensureBikeStatusController, async (ctx: GetBikeStatusContext) => {
  console.log("➡️ Appel de getBikeStatus()");
  await bikeStatusController!.getBikeStatus(ctx);
});

router.get("/bike-status/name/:name", ensureBikeStatusController, async (ctx: GetBikeStatusByNameContext) => {
  console.log("➡️ Appel de getBikeStatusByName()");
  await bikeStatusController!.getBikeStatusByName(ctx);
});

router.put("/bike-status/:id", ensureBikeStatusController, async (ctx: UpdateBikeStatusContext) => {
  console.log("➡️ Appel de updateBikeStatus()");
  await bikeStatusController!.updateBikeStatus(ctx);
});

router.delete("/bike-status/:id", ensureBikeStatusController, async (ctx: DeleteBikeStatusContext) => {
  console.log("➡️ Appel de deleteBikeStatus()");
  await bikeStatusController!.deleteBikeStatus(ctx);
});

export default router;
