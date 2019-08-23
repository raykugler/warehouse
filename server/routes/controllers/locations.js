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

  post: async (req, res) => {
    /**
     * Create a new location
     */

    // If staging location exist send it to client
    const _location = await Location.getByStagingLocation(req.body.stagingLocation);
    if (_location) return res.send(_location);

    return res.send(await Location.create(req.body))
  },

  put: async (req, res) => {
    /**
     * Update location data
     */
    // retrieve location by stagingLocation
    const obj = await Location.getByStagingLocation(req.body.stagingLocation);

    // retrieve the old version of location
    const old = await Location.getById(req.body._id);

    // If staging location changed and another location have
    // same staging location return an error
    if (obj && old.stagingLocation !== req.body.stagingLocation)
      return res.status(400).send({error: config.get('errors.locations.errc3')});

    const location = await Location.update(req.body);

    if (!location) return res.status(400)
      .send({error: config.get('errors.locations.errc1')});

    return res.send(location);
  },

  delete: async (req, res) => res.send(await Location.delById(req.params.id))
};