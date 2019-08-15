const config = require('config');

module.exports = (req, res, next) => {
  /**
   * Add routes array to the request
   */

  const data = req.body;

  if (Object.keys(data).length === 0) return res.status(400)
    .send({error: config.get('errors.routes.errc4')});

  if (!Array.isArray(data)) req.routes = [data];
  else req.routes = data;

  next();
};
