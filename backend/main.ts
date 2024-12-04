// backend/main.ts
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello from Deno!";
});

await app.listen({ port: Number(Deno.env.get("BACKEND_PORT") || 8000) });
