/**
 * Route Handler wraps handler function with http response
 * @param {Object} options -- Contains the handler and action to use  for the route
 */
export const routeHandler = (handler) => async (req, res) => {
  try {
    const result = await handler(req);
    res.status(200).json(result);
  } catch (err) {
    req.logger.error(code ? `${code} - ${message}` : message);
    res.status(status || 500).json({ message, code });
  }
};
