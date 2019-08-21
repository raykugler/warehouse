const {Lane} = require('../../models/lanes');
const {Location} = require('../../models/locations');
const config = require('config');


module.exports = {
  get: async (req, res) => {
    /**
     * Returns list of lines
     */
    await Location.getAllLocations();
    return res.send(await Lane.getAllLanes())
  },
  getById: async (req, res) => {
    /**
     * Returns lane by given id
     * @type {*}
     */

    const lane = await Lane.getById(req.params.id);

    if (!lane) return res.status(400).send({
      error: config.get('errors.lanes.errc1')
    });

    return res.send(lane);
  },

  post: async (req, res) => {
    const _lane = await Lane.getByName(req.body.name);
    if (_lane) return res.send(_lane);
    return res.send(await Lane.create(req.body))
  },

  put: async (req, res) => {

    const _lane = await Lane.getByName(req.body.name);
    const old_lane = await Lane.getById(req.body._id);

    if (_lane && _lane.name !== old_lane.name)
      return res.status(400).send({
        error: config.get('errors.lanes.errc3')
      });

    const lane = await Lane.update(req.body);

    if (!lane) return res.status(400)
      .send({error: config.get('errors.lanes.errc1')});

    return res.send(lane);
  },
  delete: async (req, res) => {
    return res.send(await Lane.delById(req.params.id));
  }
};