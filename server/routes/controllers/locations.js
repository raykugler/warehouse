const {Location} = require('../../models/locations');
const config = require('config');


module.exports = {
  get: async (req, res) => {
    /**
     * Returns list of locations
     */
    return res.send(await Location.getAllLocations())
  },
  getById: async (req, res) => {
    /**
     * Returns location by given id
     * @type {*}
     */

    const location = await Location.getById(req.params.id);

    if (!location) return res.status(400).send({
      error: config.get('errors.locations.errc1')
    });

    return res.send(location);
  },

  post: async (req, res) => res.send(await Location.create(req.body)),

  put: async (req, res) => {

    const location = await Location.update(req.body);

    if (!location) return res.status(400)
      .send({error: config.get('errors.locations.errc1')});

    return res.send(location);
  },

  delete: async (req, res) => res.send(await Location.delById(req.params.id))
};