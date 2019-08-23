const mongoose = require("mongoose");
const config = require("config");

const map = new mongoose.Schema({
  name: {
    type: String,
    minlength: config.get("maps.name.min"),
    maxlength: config.get("maps.name.max"),
    required: true,
    unique: true,
    trim: true
  },
  default: {
    type: Boolean,
    default: false
  },
  lanes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: String(config.get("lanes.tableName"))
  }]
});

map.statics.create = function(_map) {
  /**
   * Create a new map
   *
   * @type {Model}
   * @return Promise:
   */
  return this(_map).save();
};

map.statics.getCurrent = function() {
  return this.findOne().where({default: true}).select("-__v");
};

map.statics.getAll = function() {
  /**
   * Return list of maps by page
   * @return Promise:
   */
  return this.find().select("-__v");
};

map.statics.getById = function(_id) {
  /**
   * Get map by id
   * @return Object:
   */
  return this.findById(_id).select("-__v");
};

map.statics.getDefault = function() {
  /**
   * Get default map
   * @return Object:
   */
  return this.findOne({default: true}).select("-__v");
};

map.statics.getByName = function(name) {
  return this.findOne({name}).select("-__v");
};

map.statics.update = async function(obj) {
  /**
   * Update map and return map object
   * @return Promise:
   */

  const _map = await this.findOne({_id: obj._id}).select("-__v");
  if (!_map) return null;

  _map.name = obj.name;
  _map.default = obj.default;
  _map.lanes = obj.lanes;

  return _map.save();
};

map.statics.delById = function(_id) {
  /**
   * Remove map by id
   */
  return this.deleteOne({_id});
};

exports.Map = mongoose.model(String(config.get("maps.tableName")), map);


