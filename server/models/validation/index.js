const Joi = require("joi");
const schemas = require('./schemas');

const validate = (obj, schema) => Joi.validate(obj, schema);

exports.validate = validate;
exports.validateNewMap = obj => validate(obj, schemas.newMap);
exports.validateUpdateMap = obj => validate(obj, schemas.updateMap);
exports.validateNewRoute = obj => validate(obj, schemas.newRoute);
exports.validateUpdateRoute = obj => validate(obj, schemas.updateRoute);
exports.validateNewLocation = obj => validate(obj, schemas.newLocation);
exports.validateUpdateLocation = obj => validate(obj, schemas.updateLocation);
exports.validateNewLane = obj => validate(obj, schemas.validateNewLane);
exports.validateUpdateLane = obj => validate(obj, schemas.validateUpdateLane);
