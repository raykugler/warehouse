const {Routes} = require('../../models/routes');
const config = require('config');


module.exports = {
  get: async (req, res) => {
    /**
     * Returns current routes
     */
    return res.send(await Routes.getCurrent())
  },
  upload: async (req, res) => {
    /**
     * return routes object
     */

    await Routes.deleteAll();

    const routes = await Routes.create(req.routes);
    return res.send(routes);
  },

  post: async (req, res) => res.send(await Routes.create(req.values)),

  put: async (req, res) => {
    const {_id} = req.params;
    if (!_id) return res.status(400)
      .send({error: config.get('errors.routes.errc2')});


    const route = await Routes.update(req.route);

    if (!route) return res.status(400)
      .send({error: config.get('errors.routes.errc3')});

    return res.send(route);
  },
  delete: async (req, res) => {
    return res.send(await Routes.deleteAll());
  }
};