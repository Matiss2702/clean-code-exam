import { Application } from "https://deno.land/x/oak@v17.1.4/mod.ts";
import userRoutes from "./routes/userRoutes.ts";

const app = new Application();
app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());
app.use((ctx) => {
  ctx.response.body = "Hello from Deno!";
});

await app.listen({ port: Number(Deno.env.get("BACKEND_PORT") || 3000) });
