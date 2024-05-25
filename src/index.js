// NPM Module dependencies
import express from "express";
import cors from "cors";
import { urlencoded, json } from "body-parser";

// Local Package Dependencies
import { MESSAGES } from "src/constants";
import { routes } from "src/router";
import { newLogger } from "src/middleware";
import { Env } from "src/env";

/**
 * Configure an instance of the Express App with middleware, routes, and optional db
 * @returns {object} -- Express App instance and Logger
 */
export async function configure() {
  // Create the express app
  const app = express();

  // Add support for content encodings (application/x-www-form-urlencoded, json)
  app.use(urlencoded({ extended: false }));
  app.use(json());

  // Add CORS support
  app.use(cors({ origin: Env.CORS }));

  // Attach the logger
  const { routeLogger, log, logMiddleware } = newLogger();
  app.use(logMiddleware);
  app.use(routeLogger);

  // Attach the router
  app.use(routes(app));

  // Return the configured express app and logger
  return { app, log };
}

/**
 * Method to gracefully stop the server and close any open db connections
 * @param {Object} options -- Includes the server and optional db connection as well as the logger
 * @returns {Function} -- Partial app callback loaded with server and optional db connection
 */
export function stop({ server, log }) {
  return () => {
    log.info(MESSAGES.SHUTDOWN_START);
    server.close();
    log.info(MESSAGES.SHUTDOWN_COMPLETE);
  };
}

/**
 * Express service listener
 * @param {Error} err -- Server Error
 */
export function listener(log, port) {
  return (err) => {
    if (err) {
      log.info(MESSAGES.STARTUP_ERROR);
      return;
    }

    log.info(MESSAGES.STARTUP.replace("%port", port));
  };
}

/**
 * Start -- loads the express app
 */
export async function start() {
  // Create the custom instance of express
  const { app, log } = await configure();

  // Set the port
  const port = Env.PORT;

  // Start the service
  const server = await app.listen(port, listener(log, port));

  // Listen for sigint to gracefully shutdown
  process.on("SIGINT", stop({ server, log }));
}

/* istanbul ignore if */
if (!module.parent) {
  // Start the service if not imported as a module and ignore this statement in test coverage
  start();
}
