const Joi = require("joi");

Joi.objectId = require("joi-objectid")(Joi);
Joi.password = require('joi-password-complexity');

module.exports = Joi;