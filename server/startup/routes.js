const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const error = require("../middleware/error");
const config = require('config');

// Routes
const home = require('../routes/home');
const routes = require('../routes/routes');
const maps = require('../routes/maps');
const lanes = require('../routes/lanes');
const locations = require('../routes/locations');


module.exports = function (app) {

  // Middleware
  app.use(express.json(config.get('configs.json')));
  app.use(express.urlencoded(config.get('configs.urlencoded')));
  app.use(express.static('public'));
  app.use(fileUpload(config.get('configs.fileUpload')));
  app.use(require('cookie-parser')());
  app.use(cors());
  app.disable('x-powered-by');

  // Routs
  app.use('/locations', locations);
  app.use('/lanes', lanes);
  app.use('/routes', routes);
  app.use('/maps', maps);
  app.use('/', home);
  app.use(error);
};