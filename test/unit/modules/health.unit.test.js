// Import module to be tested
import { Health } from "src/modules/health";

// Local Package Dependencies
import pack from "package";
import { VERSION_TAG } from "src/constants";

describe("health module", () => {
  it("returns healthy and the service version", async () => {
    // Run the test
    const message = await Health.check();

    // Assertions
    expect(message).toEqual({
      message: "healthy",
      version: `${pack.version}-${VERSION_TAG}`,
    });
  });
});
