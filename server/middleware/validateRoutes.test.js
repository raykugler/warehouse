const config = require('config');
const validateRoutes = require('./validateRoutes');

describe('validateRoutes', () => {

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('if body is empty', () => {
    const req = {body: {}};
    const res = mockResponse();
    const next = jest.fn();

    validateRoutes(req, res, next);

    it('should not call next', function () {
      expect(next).not.toHaveBeenCalled();
    });

    it('should call res.status with 400', function () {
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should call res.send with error message', function () {
      expect(res.send).toHaveBeenCalledWith({
        error: config.get('errors.routes.errc4')
      });
    });
  });

  describe('if body is a single route', () => {
    const req = {body: {_id: "123"}};
    const res = mockResponse();
    const next = jest.fn();

    validateRoutes(req, res, next);

    it('should not call res.status', function () {
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should not call res.send', function () {
      expect(res.send).not.toHaveBeenCalled();
    });

    it('should call next', function () {
      expect(next).toHaveBeenCalled();
    });

    it('should add routes array to the request', function () {
      expect(req.routes.length).toBe(1);
    });
  });

  describe('if data is an array of routes', () => {
    const req = {body: [{_id: "123"}, {_id: "321"}]};
    const res = mockResponse();
    const next = jest.fn();

    validateRoutes(req, res, next);

    it('should not call res.status', function () {
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should not call res.send', function () {
      expect(res.send).not.toHaveBeenCalled();
    });

    it('should call next', function () {
      expect(next).toHaveBeenCalled();
    });

    it('should add an array of routes to the request', function () {
      expect(req.routes.length).toBe(req.body.length);
    });
  });
});