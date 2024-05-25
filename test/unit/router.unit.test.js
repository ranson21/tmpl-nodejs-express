// Import module to be tested
import { routes } from "src/router";

// NPM Module Dependencies
import { Router } from "express";

// Local Package Dependencies
import { routeHandler } from "pkg-nodejs-svc-common/controller";
import { initSwagger } from "pkg-nodejs-svc-common/middleware";
import { Health } from "src/modules/health";
import { Env } from "src/env";

// Mock dependencies
jest.mock("pkg-nodejs-svc-common/middleware");
jest.mock("pkg-nodejs-svc-common/controller");
jest.mock("src/modules/health");
jest.mock("src/env");
jest.mock("express");

const app = {
  use: jest.fn(),
};

const mockRouter = {
  get: jest.fn(),
};
const testHandler = jest.fn();

describe("router.js", () => {
  beforeAll(() => {
    Router.mockImplementation(() => mockRouter);
    routeHandler.mockReturnValue(testHandler);
  });
  it("attaches route handlers to endpoints and returns the router", () => {
    // Setup the test
    Env.API_PATH = "test";

    // Run the test
    routes(app);

    // Assertions
    expect(app.use).toHaveBeenCalledWith(Env.API_PATH, mockRouter);
    expect(initSwagger).toHaveBeenCalledWith(mockRouter);
    expect(routeHandler).toHaveBeenCalledWith(Health.check);
    expect(mockRouter.get).toHaveBeenCalledWith("/health", testHandler);
  });
});
