import process from "child_process";

export const VERSION_TAG = process
  .execSync("git rev-parse HEAD")
  .toString()
  .trim()
  .substring(0, 7);
