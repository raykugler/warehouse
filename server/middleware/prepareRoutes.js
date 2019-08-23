const config = require('config');

module.exports = function (req, res, next) {
  /**
   * Generates routes list from 2d array
   */

  const send = msg => res.status(400).send({error: msg});
  const headers = req.xls[0];
  const list = req.xls.slice(1).filter(item => item.length > 0);


  if (!headers || headers.length === 0)
    return send(config.get('errors.upload.xlsx.errc4'));

  const headersMap = {
    'Staging Location': 'stagingLocation',
    'Route Code': 'routeCode',
    'DSP': 'dsp'
  };

  req.routes = [];

  for (let i = 0; i < list.length; i++) {

    const route = {};

    for (let j = 0; j < headers.length; j++) {
      if (list[i][j] !== undefined && headersMap[headers[j]])
        route[headersMap[headers[j]]] = list[i][j];
    }

    req.routes.push(route);
  }

  delete req.xls;
  next();
};