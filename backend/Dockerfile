# backend/Dockerfile
FROM denoland/deno:alpine

EXPOSE ${BACKEND_PORT}

WORKDIR /app

USER deno

CMD ["run", "--allow-net", "--allow-env", "main.ts"]
