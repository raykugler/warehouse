const {Map} = require('../../models/maps');
const config = require('config');


module.exports = {
  get: async (req, res) => {
    /**
     * Returns current routes
     */
    return res.send(await Map.getAll())
  },
  getCurrent: async (req, res) => {
    /**
     * Returns default map
     * @type {*}
     */

    const map = await Map.getCurrent();

    if (!map) return res.status(400).send({
      error: config.get('errors.maps.errc1')
    });

    return res.send(map);
  },

  post: async (req, res) => res.send(await Map.create(req.value)),

  put: async (req, res) => {
    if (!req.body._id) req.body._id = req.params.id;

    if (req.body._id !== req.params.id) return res.status(400).send({
      error: config.get('errors.maps.errc3')
    });

    const map = await Map.update(req.body);

    if (!map) return res.status(400)
      .send({error: config.get('errors.maps.errc2')});

    return res.send(map);
  },
  delete: async (req, res) => {
    return res.send(await Map.delById(req.params.id));
  }
};