const Joi = require('../../lib/joi');
const config = require('config');

exports.routesArray = Joi.array().items(Joi.object({
  routeCode: Joi.string().required(),
  dsp: Joi.string().required(),
  stagingLocation: Joi.string().required()
}));

exports.newRoute = {
  routeCode: Joi.string().required(),
  dsp: Joi.string().required(),
  stagingLocation: Joi.string().required()
};

exports.updateRoute = {
  _id: Joi.objectId(),
  routeCode: Joi.string().required(),
  dsp: Joi.string().required(),
  stagingLocation: Joi.objectId().required(),
  status: Joi.string(),
  counter: Joi.number(),
  date: Joi.string(),
  __v: Joi.number()
};

exports.newMap = {
  name: Joi.string().required(),
  default: Joi.boolean().default(false),
  lanes: Joi.array().items(Joi.objectId()),
};

exports.updateMap = {
  _id: Joi.objectId(),
  name: Joi.string().required(),
  default: Joi.boolean().default(false),
  lanes: Joi.array().items(Joi.objectId()),
  __v: Joi.number()
};

exports.validateNewLane = {
  name: Joi.string().required(),
  locations: Joi.array().items(Joi.objectId())
};

exports.validateUpdateLane = {
  _id: Joi.objectId(),
  name: Joi.string().required(),
  locations: Joi.array().items(Joi.objectId()),
  __v: Joi.number()
};

exports.newLocation = {
  stagingLocation: Joi.string().required(),
  routes: Joi.array().items(Joi.objectId())
};

exports.updateLocation = {
  _id: Joi.objectId(),
  stagingLocation: Joi.string().required(),
  routes: Joi.array().items(Joi.objectId()).required(),
  __v: Joi.number()
};