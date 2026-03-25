import { serve } from "@hono/node-server";
import { createMainApp } from "./app.js";

const app = createMainApp();
const port = Number(process.env.PORT) || 3000;

console.log(`Server running at http://localhost:${port}`);
serve({ fetch: app.fetch, port });
