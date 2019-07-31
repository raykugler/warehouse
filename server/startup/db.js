const mongoose = require("mongoose");
const config = require("config");
const winston = require("winston");
const db = config.get("db");

module.exports = () => mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => winston.info("connected to database"))
  .catch(e => winston.error(e));
