// Import the module to be tested
import { start, stop } from "src/index";

// NPM Module Dependencies
import express from "express";
import cors from "cors";
import { urlencoded, json } from "body-parser";
import { config as env } from "dotenv";

// Local Package Dependencies
import { MESSAGES } from "src/constants";
import { routes } from "src/router";
import { newLogger } from "src/middleware";

// Mock Dependencies
jest.mock("express");
jest.mock("cors");
jest.mock("src/router");
jest.mock("src/middleware");
jest.mock("body-parser", () => ({
  urlencoded: jest.fn(),
  json: jest.fn(),
}));

// Mock data
const app = {
  use: jest.fn(),
  listen: jest.fn().mockReturnValue(),
};

const logger = {
  logMiddleware: jest.fn(),
  log: { info: jest.fn() },
  routeLogger: jest.fn(),
  errorLogger: jest.fn(),
};
const mockRoutes = jest.fn();
const mockCors = jest.fn();
const jsonParser = jest.fn();
const formParser = jest.fn();

describe("Service", () => {
  beforeAll(() => {
    express.mockImplementation(() => app);
    newLogger.mockImplementation(() => logger);
    routes.mockImplementation(() => mockRoutes);
    cors.mockImplementation(() => mockCors);
    urlencoded.mockImplementation(() => formParser);
    json.mockImplementation(() => jsonParser);
  });

  afterAll(() => {
    // Restore the environment
    env();
  });

  it("Loads default env variables", async () => {
    // Setup the test
    delete process.env.PORT;

    // Run the test
    await start();

    // Assertions
    expect(app.listen).toHaveBeenCalledWith({ port: 4000 });
  });

  it("Loads passed env variables", async () => {
    // Setup the test
    const port = "9000";
    process.env.PORT = port;

    // Run the test
    await start();

    // Assertions
    expect(app.listen).toHaveBeenCalledWith({ port });
  });

  it("Registers default middleware", async () => {
    // Run the test
    await start();

    // Check for correctly configured middleware
    expect(json).toHaveBeenCalled();
    expect(urlencoded).toHaveBeenCalledWith({ extended: false });
    expect(cors).toHaveBeenCalledWith({ origin: "*" });

    // Check the middleware is attached in the correct order
    expect(app.use).toHaveBeenNthCalledWith(1, formParser);
    expect(app.use).toHaveBeenNthCalledWith(2, jsonParser);
    expect(app.use).toHaveBeenNthCalledWith(3, mockCors);
    expect(app.use).toHaveBeenNthCalledWith(4, logger.logMiddleware);
    expect(app.use).toHaveBeenNthCalledWith(5, logger.routeLogger);
    expect(app.use).toHaveBeenNthCalledWith(6, mockRoutes);
  });

  it("Gracefully shuts down the server", async () => {
    // Setup the test
    const server = { close: jest.fn() };
    const log = { info: jest.fn() };
    const term = stop({ server, log });

    // Run the test
    await term();

    // Assertions
    expect(log.info).toHaveBeenNthCalledWith(1, MESSAGES.SHUTDOWN_START);
    expect(server.close).toHaveBeenCalled();
    expect(log.info).toHaveBeenNthCalledWith(2, MESSAGES.SHUTDOWN_START);
  });
});