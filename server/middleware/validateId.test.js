const validateId = require('./validateId');

describe('validateId', () => {

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('if request.body does not have an id', () => {

    const req = {body: {}, params: {id: '1'}};
    const res = mockResponse();
    const next = jest.fn();

    beforeAll(() => {
      validateId('some error message')(req, res, next);
    });

    afterAll(() => {
      res.status = null;
      res.send = null;
    });

    it('should add an id to request.body', function () {
      expect(req.body).toHaveProperty('_id', req.params.id);
    });

    it('should call next', function () {
      expect(next).toHaveBeenCalled();
    });
  });

  describe('if req.body._id !== req.params.id', () => {

    const req = {body: {_id: '2'}, params: {id: '1'}};
    const res = mockResponse();
    const next = jest.fn();
    const error = 'test error message';

    beforeAll(() => {
      validateId(error)(req, res, next);
    });

    afterAll(() => {
      res.status = null;
      res.send = null;
    });

    it('should call res.status with code 400', function () {
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should call res.send with error message', function () {
      expect(res.send).toHaveBeenCalledWith({error});
    });

    it('should not call next', function () {
      expect(next).not.toHaveBeenCalled();
    });
  });
});