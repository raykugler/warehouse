const winston = require("winston");

module.exports = function (err, req, res, next) {
  /**
   * Error middleware. If any route create error this middleware will pass
   * the error to the winston, and return error message with status code 500
   */

  // Add error to the log file
  winston.error(err);
  return res.status(500).send("Oops... Something went wrong")
};