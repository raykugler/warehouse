const mongoose = require("mongoose");
const config = require('config');

const routes = new mongoose.Schema({
  date : { type : Date, default: Date.now },
  routeCode: { type: String, required: true },
  dsp: { type: String, required: true },
  stagingLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: String(config.get("locations.tableName")),
  },
  status: {
    type: String,
    default: 'Not started'
  },
  counter: {
    type: Number,
    default: 0
  }
});

routes.statics.create = function(_routes) {
  /**
   * Save routes
   *
   * @type {Model}
   * @return Promise:
   */
  return this.insertMany(_routes);
};

routes.statics.getCurrent = function() {
  /**
   * Return list of routes (current day)
   * @return Promise:
   */
  const today = todayIs();
  return this.find({date: {$gte: today}}).select("-__v");
};

routes.statics.getAll = function() {
  /**
   * Return list of all routes
   * @return Promise:
   */
  return this.find().select("-__v");
};

routes.statics.update = async function(_route) {
  /**
   * Update routes
   * @return Promise:
   */

  const current = await this.findOne({_id: _route._id});

  if (_route.dsp) current.dsp = _route.dsp;
  if (_route.stagingLocation)
    current.stagingLocation = _route.stagingLocation;
  if (_route.routeCode)
    current.routeCode = _route.routeCode;
  if (_route.status) current.status = _route.status;
  if (_route.counter) current.counter = _route.counter;

  return current.save();
};

routes.statics.deleteAll = function() {
  /**
   * Remove routes
   */
  return this.deleteMany({});
};

function todayIs() {
  /**
   * Calculate current date
   * @type {Date}
   */
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}


exports.Routes = mongoose.model(String(config.get("routes.tableName")), routes);