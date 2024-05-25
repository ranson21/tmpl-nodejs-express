// Define all environment variables used by the service
// set default values or "" for no default
const vars = {
  API_PATH: "",
  CORS: "*",
  PORT: 4000,
};

export const Env = {
  ...Object.keys(vars).reduce(
    (items, item) => ({
      ...items,
      [item]: process.env[item] || vars[item],
    }),
    {},
  ),
};
