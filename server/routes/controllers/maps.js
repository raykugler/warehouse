const config = require('config');
const {Map} = require('../../models/maps');
const {Lane} = require('../../models/lanes');


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

    const _lanes = [];

    // Populate lanes
    for (let i = 0; i < map.lanes.length; i++) {
      _lanes.push(await Lane.getById(map.lanes[i]))
    }

    map.lanes = _lanes;

    return res.send(map);
  },

  post: async (req, res) => {
    /**
     * Create a new map
     */
    const _map = await Map.getByName(req.value.name);
    if (_map) return res.send(_map);

    return res.send(await Map.create(req.value))
  },

  put: async (req, res) => {

    const _map = await Map.getByName(req.body.name);
    const old_map = await Map.getById(req.body._id);

    if (!old_map) return res.status(400)
      .send({error: config.get('errors.maps.errc2')});

    if (_map && old_map.name !== _map.name)
      return res.status(400).send({
        error: config.get('errors.maps.errc4')
      });

    return res.send(await Map.update(req.body));
  },
  delete: async (req, res) => {
    return res.send(await Map.delById(req.params.id));
  }
};