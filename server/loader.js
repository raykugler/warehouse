const express = require("express");
const app = require('./app');

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/middleware")(app);


module.exports = app;