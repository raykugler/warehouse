const app = require('./app');

require("./startup/logging")();
require("./startup/db")();
require("./startup/config")();
require("./startup/middleware")(app);
require("./startup/routes")(app);

module.exports = app;