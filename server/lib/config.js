const config = require('config');

module.exports = {
  get: key => config.get(key),
  has: key => config.has(key)
};