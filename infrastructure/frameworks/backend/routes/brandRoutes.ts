import { Router, RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { BrandController } from "../controllers/BrandController.ts";

type CreateBrandContext = RouterContext<"/brands", Record<string | number, string | undefined>>;
type GetBrandContext = RouterContext<"/brands/:id", { id: string }>;
type GetBrandByLinkContext = RouterContext<"/brands/link/:link", { link: string }>;
type UpdateBrandContext = RouterContext<"/brands/:id", { id: string }>;
type DeleteBrandContext = RouterContext<"/brands/:id", { id: string }>;

const router = new Router();
let brandController: BrandController | null = null;

export function setBrandController(controller: BrandController) {
  brandController = controller;
}

const ensureBrandControllerCreate = async (ctx, next) => {
  if (!brandController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "BrandController not initialized" };
    return;
  }
  await next();
};

const ensureBrandControllerGet = async (ctx, next) => {
  if (!brandController) {
    ctx.response.status = 500;
    ctx.response.body = { error: "BrandController not initialized" };
    return;
  }
  await next();
};

// Routes
router.post("/brands", ensureBrandControllerCreate, async (ctx: CreateBrandContext) => {
  console.log("➡️ Appel de createBrand()");
  await brandController!.createBrand(ctx);
});

router.get("/brands/:id", ensureBrandControllerGet, async (ctx: GetBrandContext) => {
  console.log("➡️ Appel de getBrand()");
  await brandController!.getBrand(ctx);
});

router.get("/brands/link/:link", async (ctx: GetBrandByLinkContext) => {
  console.log("➡️ Appel de getBrandByLink()");
  await brandController!.getBrandByLink(ctx);
});

router.get("/brands", ensureBrandControllerGet, async (ctx) => {
  console.log("➡️ Appel de getAllBrands()");
  await brandController!.getAllBrands(ctx);
});

router.put("/brands/:id", ensureBrandControllerGet, async (ctx: UpdateBrandContext) => {
  console.log("➡️ Appel de updateBrand()");
  await brandController!.updateBrand(ctx);
});

router.delete("/brands/:id", ensureBrandControllerGet, async (ctx: DeleteBrandContext) => {
  console.log("➡️ Appel de deleteBrand()");
  await brandController!.deleteBrand(ctx);
});

export default router;
