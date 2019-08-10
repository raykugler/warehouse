const XLSX = require('xlsx');
const config = require('config');

// Requirements
const read = XLSX.read;
const x2j = XLSX.utils.sheet_to_json;

module.exports = function (req, res, next) {
  /**
   * Upload XLS
   */

  const send = msg => res.status(400).send({error: msg});

  const {routes} = req.files;

  if (!routes)
    return send(config.get('errors.upload.xlsx.errc1'));

  if (routes.mimetype !== 'application/vnd.ms-excel')
    return send(config.get('errors.upload.xlsx.errc2'));
  const wb = read(routes.data, config.get('configs.xlsx'));

  const key = Object.keys(wb.Sheets)[0];

  req.xls = x2j(wb.Sheets[key], {header:1});

  next();
};