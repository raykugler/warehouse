const {Lane} = require('../../models/lanes');
const config = require('config');


module.exports = {
  get: async (req, res) => {
    /**
     * Returns list of lines
     */
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

  post: async (req, res) => res.send(await Lane.create(req.body)),

  put: async (req, res) => {
    if (!req.body._id) req.body._id = req.params.id;

    if (req.body._id !== req.params.id) return res.status(400).send({
      error: config.get('errors.lanes.errc2')
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