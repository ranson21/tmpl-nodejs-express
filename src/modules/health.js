import pack from "package";

export const Health = {
/**
 * Health Check Endpoint
 * @param {Object} req -- Express Request Object
 * @param {Object} res -- Express Response Object
 */
  check: async () => {
    return { message: "healthy", version: pack.version };
  },
};
