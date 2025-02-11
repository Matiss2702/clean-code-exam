import { Router, RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { BikeController } from "../controllers/BikeController.ts";

type CreateBikeContext = RouterContext<"/bike", Record<string | number, string | undefined>>;
type GetBikeContext = RouterContext<"/bike/:id", { id: string }>;
type GetBikeBySerialNumberContext = RouterContext<"/bike/serial/:serialNumber", { serialNumber: string }>;
type GetBikeByPlateNumberContext = RouterContext<"/bike/plate/:plateNumber", { plateNumber: string }>;
type UpdateBikeContext = RouterContext<"/bike/:id", { id: string }>;
type DeleteBikeContext = RouterContext<"/bike/:id", { id: string }>;

const router = new Router();
let bikeController: BikeController | null = null;

export function setBikeController(controller: BikeController) {
  bikeController = controller;
}

const ensureBikeControllerCreate = async (ctx, next) => {
  if (!bikeController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "BikeController not initialized" };
    return;
  }
  await next();
};

const ensureBikeControllerGet = async (ctx, next) => {
  if (!bikeController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "BikeController not initialized" };
    return;
  }
  await next();
};

// Routes
router.post("/bike", ensureBikeControllerCreate, async (ctx: CreateBikeContext) => {
  console.log("➡️ Appel de createBike()");
  await bikeController!.createBike(ctx);
});

router.get("/bike/:id", ensureBikeControllerGet, async (ctx: GetBikeContext) => {
  console.log("➡️ Appel de getBike()");
  await bikeController!.getBike(ctx);
});

router.get("/bike/serial/:serialNumber", async (ctx: GetBikeBySerialNumberContext) => {
  console.log("➡️ Appel de getBikeBySerialNumber()");
  await bikeController!.getBikeBySerialNumber(ctx);
});

router.get("/bike/plate/:plateNumber", async (ctx: GetBikeByPlateNumberContext) => {
  console.log("➡️ Appel de getBikeByPlateNumber()");
  await bikeController!.getBikeByPlateNumber(ctx);
});

router.get("/bike", ensureBikeControllerGet, async (ctx) => {
  console.log("➡️ Appel de getAllBikes()");
  await bikeController!.getAllBikes(ctx);
});

router.put("/bike/:id", ensureBikeControllerGet, async (ctx: UpdateBikeContext) => {
  console.log("➡️ Appel de updateBike()");
  await bikeController!.updateBike(ctx);
});

router.delete("/bike/:id", ensureBikeControllerGet, async (ctx: DeleteBikeContext) => {
  console.log("➡️ Appel de deleteBike()");
  await bikeController!.deleteBike(ctx);
});

export default router;
