const mongoose = require("mongoose");
const config = require('config');

const routes = new mongoose.Schema({
  date : { type : Date, default: Date.now },
  routes: { type: Array, required: true }
});

routes.statics.create = function(_routes) {
  /**
   * Save routes
   *
   * @type {Model}
   * @return Promise:
   */
  return this(_routes).save();
};

routes.statics.getCurrent = function() {
  /**
   * Return list of routes
   * @return Promise:
   */
  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return this.findOne({date: {$gte: today}}).select("-__v");
};

routes.statics.update = async function(_routes) {
  /**
   * Update routes
   * @return Promise:
   */

  const __routes = await this.getCurrent();
  if (!__routes) return null;

  __routes.routes = _routes.routes;

  return __routes.save();
};

routes.statics.deleteCurrent = async function() {
  /**
   * Remove routes
   */
  const item = await this.getCurrent();
  if (!item) return null;

  return item.remove();
};


exports.Routes = mongoose.model(String(config.get("routes.tableName")), routes);