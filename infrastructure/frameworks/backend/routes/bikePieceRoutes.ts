import { Router, RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { BikePieceController } from "../controllers/BikePieceController.ts";

type CreateBikePieceContext = RouterContext<"/bike-piece", Record<string | number, string | undefined>>;
type GetBikePieceContext = RouterContext<"/bike-piece/:id", { id: string }>;
type GetBikePieceByReferenceContext = RouterContext<"/bike-piece/reference/:reference", { reference: string }>;
type UpdateBikePieceContext = RouterContext<"/bike-piece/:id", { id: string }>;
type DeleteBikePieceContext = RouterContext<"/bike-piece/:id", { id: string }>;

const router = new Router();
let bikePieceController: BikePieceController | null = null;

export function setBikePieceController(controller: BikePieceController) {
  bikePieceController = controller;
}

const ensureBikePieceControllerCreate = async (ctx, next) => {
  if (!bikePieceController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "BikePieceController not initialized" };
    return;
  }
  await next();
};

const ensureBikePieceControllerGet = async (ctx, next) => {
  if (!bikePieceController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "BikePieceController not initialized" };
    return;
  }
  await next();
};

// Routes
router.post("/bike-piece", ensureBikePieceControllerCreate, async (ctx: CreateBikePieceContext) => {
  console.log("➡️ Appel de createBikePiece()");
  await bikePieceController!.createBikePiece(ctx);
});

router.get("/bike-piece/:id", ensureBikePieceControllerGet, async (ctx: GetBikePieceContext) => {
  console.log("➡️ Appel de getBikePiece()");
  await bikePieceController!.getBikePiece(ctx);
});

router.get("/bike-piece/reference/:reference", async (ctx: GetBikePieceByReferenceContext) => {
  console.log("➡️ Appel de getBikePieceByReference()");
  await bikePieceController!.getBikePieceByReference(ctx);
});

router.get("/bike-piece", ensureBikePieceControllerGet, async (ctx) => {
  console.log("➡️ Appel de getAllBikePieces()");
  await bikePieceController!.getAllBikePieces(ctx);
});

router.put("/bike-piece/:id", ensureBikePieceControllerGet, async (ctx: UpdateBikePieceContext) => {
  console.log("➡️ Appel de updateBikePiece()");
  await bikePieceController!.updateBikePiece(ctx);
});

router.delete("/bike-piece/:id", ensureBikePieceControllerGet, async (ctx: DeleteBikePieceContext) => {
  console.log("➡️ Appel de deleteBikePiece()");
  await bikePieceController!.deleteBikePiece(ctx);
});

export default router;
