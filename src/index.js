import { configure, start } from "pkg-nodejs-svc-common";

import { routes } from "src/router";
import { Env } from "src/env";

/* istanbul ignore next */
// Create the custom instance of express
configure(routes, Env).then(({ app, log }) => {
  // Start the service if not imported as a module and ignore this statement in test coverage
  start(app, log, Env);
});
