const validateBody = require('./validateBody');


describe('validateBody', () => {

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('if validator return an error', () => {

    const req = {body: {data: ""}};
    const res = mockResponse();
    const next = jest.fn();
    const message = "body is empty";
    const validator = jest.fn().mockImplementation(() => {
      return {
        error: {details: [ { message } ]},
        value: null
      }
    });
    validateBody(validator)(req, res, next);

    it('should not call next', function () {
      expect(next).not.toHaveBeenCalled();
    });

    it('should call validator', function () {
      expect(validator).toHaveBeenCalledWith(req.body);
    });

    it('should call res.status with code 400', function () {
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should call res.send with error message', function () {
      expect(res.send).toHaveBeenCalledWith({error: message});
    });
  });

  describe('if validator return value', () => {

    const req = {body: {data: "some data"}};
    const res = mockResponse();
    const next = jest.fn();

    const validator = jest.fn().mockImplementation(() => {
      return {
        error: null,
        value: req.body
      }
    });
    validateBody(validator)(req, res, next);

    it('should call next', function () {
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should call validator', function () {
      expect(validator).toHaveBeenCalledWith(req.body);
    });

    it('should not call res.status', function () {
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should not call res.send', function () {
      expect(res.send).not.toHaveBeenCalled();
    });

    it('should add value to request', function () {
      expect(req.value).toMatchObject(req.body);
    });
  });
});