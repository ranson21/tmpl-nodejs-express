import { createLogger } from "winston";
import request from "supertest";
import { config as env } from "dotenv";

import { configure } from "src/index";

// Mock dependency modules
jest.mock("winston", () => {
  const original = jest.requireActual("winston");

  if (!process.env.DEBUG) {
    return {
      transports: {
        Console: jest.fn(),
      },
      createLogger: jest.fn(),
      format: {
        combine: jest.fn(),
        colorize: jest.fn(),
        timestamp: jest.fn(),
        printf: jest.fn(),
      },
    };
  }

  return original;
});

// Test Data
let config;
const mockLogger = {
  error: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
};

describe("Controller", () => {
  beforeAll(async () => {
    if (!process.env.DEBUG) {
      // Suppress log output
      createLogger.mockReturnValue(mockLogger);
    }

    // Configure the Express app
    config = await configure();
  });

  afterAll(() => {
    // Restore the environment
    env();
  });

  describe("Health Check", () => {
    it("GET /health - Returns healthy", async () => {
      const { status, body } = await request(config.app).get("/health");

      expect(status).toEqual(200);
      expect(body?.message).toEqual("healthy");
    });
  });
});
