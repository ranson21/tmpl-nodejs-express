// Import module to be tested
import { routes } from "src/router";

// NPM Module Dependencies
import { Router } from "express";

// Local Package Dependencies
import { routeHandler } from "src/controller";
import { initSwagger } from "src/middleware";
import { Health } from "src/modules/health";
import { Env } from "src/env";

// Mock dependencies
jest.mock("src/middleware");
jest.mock("src/controller");
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
    Env.apiPath = "test";

    // Run the test
    routes(app);

    // Assertions
    expect(app.use).toHaveBeenCalledWith(Env.apiPath, mockRouter);
    expect(initSwagger).toHaveBeenCalledWith(mockRouter);
    expect(routeHandler).toHaveBeenCalledWith(Health.check);
    expect(mockRouter.get).toHaveBeenCalledWith("/health", testHandler);
  });
});
