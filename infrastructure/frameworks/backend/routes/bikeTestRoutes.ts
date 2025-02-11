import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { BikeTestController } from "../controllers/BikeTestController.ts";

const router = new Router();
let bikeTestController: BikeTestController | null = null;

export function setBikeTestController(controller: BikeTestController) {
  bikeTestController = controller;
}

const ensureBikeTestController = async (ctx, next) => {
  if (!bikeTestController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "BikeTestController not initialized" };
    return;
  }
  await next();
};

router.post("/bike-test", ensureBikeTestController, async (ctx) => {
  await bikeTestController!.create(ctx);
});

router.get("/bike-test", ensureBikeTestController, async (ctx) => {
  await bikeTestController!.getAll(ctx);
});

router.get("/bike-test/:id", ensureBikeTestController, async (ctx) => {
  await bikeTestController!.get(ctx);
});

router.get("/bike-test/user/:user_id", ensureBikeTestController, async (ctx) => {
  await bikeTestController!.getByUserId(ctx);
});

router.put("/bike-test/:id", ensureBikeTestController, async (ctx) => {
  await bikeTestController!.update(ctx);
});

router.put("/bike-test/:id/accept", ensureBikeTestController, async (ctx) => {
  await bikeTestController!.accept(ctx);
});

router.delete("/bike-test/:id", ensureBikeTestController, async (ctx) => {
  await bikeTestController!.delete(ctx);
});

export default router;
