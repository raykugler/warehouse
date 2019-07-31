const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");

// Routes
const home = require("../routes/home");



module.exports = function (app) {

  // Middleware
  app.use(express.json({limit: '50mb'}));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(express.static('public'));
  app.use(require('cookie-parser')());
  app.use(cors());
  app.disable('x-powered-by');

  // Routs
  app.use('/', home);
  app.use(error);
};