export const config = {
  user: Deno.env.get("POSTGRES_USER") ?? "postgres",
  password: Deno.env.get("POSTGRES_PASSWORD") ?? "postgres",
  database: Deno.env.get("POSTGRES_DB") ?? "mydb",
  hostname: Deno.env.get("POSTGRES_HOST") ?? "localhost",
  port: Number(Deno.env.get("POSTGRES_PORT") ?? 5432),
};
