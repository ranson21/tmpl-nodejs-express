import { Router } from "express";
import { routeHandler } from "pkg-nodejs-svc-common/controller";
import { initSwagger } from "pkg-nodejs-svc-common/middleware";
import { Health } from "src/modules/health";
import { Env } from "src/env";

/**
 * Creates an instance of the Express Router and attaches service routes
 * @returns {Object} -- Express Router Instance
 */
export const routes = (app) => {
  // Create the router
  const router = new Router();

  // Attach the base path for the service
  app.use(Env.API_PATH, router);

  // Attach the routes to the controller
  router.get("/health", routeHandler(Health.check));

  // Attach the swagger endpoints
  initSwagger(router);

  // Return the constructed router
  return router;
};
