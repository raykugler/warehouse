const mongoose = require("mongoose");
const config = require("config");

const location = new mongoose.Schema({
  stagingLocation: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  routes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: String(config.get("locations.tableName"))
  }]
});

location.statics.create = function(_loc) {
  /**
   * Create a new location
   *
   * @type {Model}
   * @return Promise:
   */
  return this(_loc).save();
};

location.statics.getAllLocations = function() {
  /**
   * Return list of lanes
   * @return Promise:
   */
  return this.find().select("-__v");
};

location.statics.getById = function(_id) {
  /**
   * Get map by id
   * @return Object:
   */
  return this.findById(_id).select("-__v");
};

location.statics.getByStagingLocation = function(stagingLocation) {
  return this.findOne({stagingLocation});
};

location.statics.update = async function(obj) {
  /**
   * Update and return location
   * @return Promise:
   */

  const _location = await this.findById(obj._id).select("-__v");
  if (!_location) return null;

  _location.stagingLocation = obj.stagingLocation;
  _location.routes = obj.routes;

  return _location.save();
};

location.statics.delById = async function(_id) {
  /**
   * Remove lane by id
   */
  return this.deleteOne({_id});
};

exports.Location = mongoose.model(String(config.get("locations.tableName")), location);


