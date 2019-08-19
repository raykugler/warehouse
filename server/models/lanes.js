const mongoose = require("mongoose");
const config = require("config");

const lane = new mongoose.Schema({
  name: {
    type: String,
    minlength: config.get("lanes.name.min"),
    maxlength: config.get("lanes.name.max"),
    required: true,
    unique: true,
    trim: true
  },
  locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: String(config.get("locations.tableName"))
  }]
});

lane.statics.create = function(_lane) {
  /**
   * Create a new lane
   *
   * @type {Model}
   * @return Promise:
   */
  return this(_lane).save();
};

lane.statics.getAllLanes = function() {
  /**
   * Return list of lanes
   * @return Promise:
   */
  return this.find().populate('locations').select("-__v");
};

lane.statics.getById = function(_id) {
  /**
   * Get map by id
   * @return Object:
   */
  return this.findOne({_id});
};

lane.statics.update = async function(obj) {
  /**
   * Update and return lane
   * @return Promise:
   */

  const _lane = await this.findById(obj._id);
  if (!_lane) return null;

  _lane.name = obj.name;
  _lane.locations = obj.locations;

  return _lane.save();
};

lane.statics.delById = async function(_id) {
  /**
   * Remove lane by id
   */
  return this.deleteOne({_id});
};

exports.Lane = mongoose.model(String(config.get("lanes.tableName")), lane);


