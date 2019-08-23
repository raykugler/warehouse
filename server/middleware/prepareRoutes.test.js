const config = require('config');
const prepareRoutes = require('./prepareRoutes');

describe('prepareRoutes middleware', () => {

  const data = [
    ['header_1', 'header_2'],
    ['value_1', 'value_2'],
    []
  ];

  const routes = [
    {
      header_1: 'value_1',
      header_2: 'value_2',
      status: 'not started',
      counter: 0
    }
  ];

  const req = {
    xls: data
  };
  const send = {send: jest.fn()};
  const res = {
    status: jest.fn()
      .mockImplementation(() => send)
  };

  const next = jest.fn();

  describe('if headers is empty', () => {

    prepareRoutes({xls: []}, res, next);

    it('should call res.status with code 400', function () {
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should call send with error message', function () {
      expect(send.send)
        .toHaveBeenCalledWith({
          error: config.get('errors.upload.xlsx.errc4')
        });
    });
  });

  describe('if data is valid', () => {
    prepareRoutes(req, res, next);

    it('should call next', function () {
      expect(next).toHaveBeenCalled();
    });

    it('should remove xls property from request', function () {
      expect(req.xls).toBe(undefined);
    });
  });
});