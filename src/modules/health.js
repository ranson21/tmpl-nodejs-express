import pack from "package";
import { VERSION_TAG } from "src/constants";

export const Health = {
  /**
   * Health Check Endpoint
   * @param {Object} req -- Express Request Object
   * @param {Object} res -- Express Response Object
   */
  check: async () => {
    return { message: "healthy", version: `${pack.version}-${VERSION_TAG}` };
  },
};
