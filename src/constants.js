import process from "child_process";

// Global constants
export const MESSAGES = {
  STARTUP: "🚀 Server running at localhost:%port",
  SHUTDOWN_START: "Shutting down... To force quit hit Ctrl+C again",
  SHUTDOWN_COMPLETE: "✅ Successfully closed the server",
  STARTUP_ERROR: "Error in server setup",
};

export const VERSION_TAG = process
  .execSync("git rev-parse HEAD")
  .toString()
  .trim()
  .substring(0, 7);
