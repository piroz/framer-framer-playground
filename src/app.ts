import { createApp } from "framer-framer/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { html } from "./html.js";

export function createMainApp(): Hono {
  const app = new Hono();

  app.use("/api/*", cors());

  const embedApp = createApp({
    defaultOptions: { sanitize: false },
  });
  app.route("/api", embedApp);

  app.get("/", (c) => c.html(html));

  return app;
}
