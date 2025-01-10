import { Router } from "https://deno.land/x/oak@v17.1.4/mod.ts";
import { UserController } from "@controllers/UserController.ts";

const router = new Router();
const userController = new UserController();

router.post("/users", (ctx: any) => userController.createUser(ctx));
router.get("/users/:id", (ctx: any) => userController.getUser(ctx));

export default router;
