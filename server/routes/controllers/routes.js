const {Routes} = require('../../models/routes');
const config = require('config');


module.exports = {
  get: async (req, res) => {
    /**
     * Returns an array of routes
     */
    return res.send(await Routes.getAllRoutes())
  },
  getById: async (req, res) => {
    /**
     * Returns current routes
     */
    return res.send(await Routes.getById(req.params.id));
  },
  upload: async (req, res) => {
    /**
     * Return create an array of routes
     */

    await Routes.deleteAll();

    const routes = await Routes.create(req.routes);
    return res.send(routes);
  },

  post: async (req, res) => {
    /**
     * Create a new route
     */
    const _route = await Routes.getByRouteCode(req.value.routeCode);
    if (_route) return res.send(_route);

    return res.send(await Routes.create(req.value))
  },

  put: async (req, res) => {

    const old_route = await Routes.getById(req.body._id);
    const conflict_route = await Routes.getByRouteCode(req.body.routeCode);

    if (!old_route) return res.status(400)
      .send({error: config.get('errors.routes.errc3')});

    if (conflict_route && old_route.routeCode !== req.body.routeCode)
      return res.status(400).send({
        error: config.get('errors.routes.errc6')
      });

    return res.send(await Routes.update(req.body));
  },
  delete: async (req, res) => {
    return res.send(await Routes.deleteAll());
  }
};