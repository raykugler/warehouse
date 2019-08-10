const config = require('config');
const uploadXLS = require('./uploadXLS');

describe('uploadXLS', () => {

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };


  describe('if name routes undefined', () => {
    const next = jest.fn();
    const res = mockResponse();

    uploadXLS({files: {}}, res, next);

    it('should call status with code 400', function () {
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should call send with error message', function () {
      expect(res.send).toHaveBeenCalledWith({
        error: config.get('errors.upload.xlsx.errc1')
      })
    });

    it('should not call next', function () {
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('if file is empty or wrong format', () => {

    const req = {
      files: {
        routes: {
          mimetype: 'application/javascript',
          data: Buffer.from('../tests/files/bad.xls')
        }
      }
    };

    const res = mockResponse();
    const next = jest.fn();

    uploadXLS(req, res, next);

    it('should call status with code 400', function () {
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should call send with error message', function () {
      expect(res.send).toHaveBeenCalledWith({
        error: config.get('errors.upload.xlsx.errc2')
      })
    });

    it('should not call next', function () {
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('if passed valid xls file', () => {

    const req = {
      files: {
        routes: {
          name: 'data.xlsx',
          mimetype: 'application/vnd.ms-excel',
          data: Buffer.from('../tests/files/data.xlsx')
        }
      }
    };
    const res = mockResponse();
    const next = jest.fn();

    uploadXLS(req, res, next);

    it('should not call res.status', function () {
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should not call res.send', function () {
      expect(res.send).not.toHaveBeenCalled();
    });

    it('should call next', function () {
      expect(next).toHaveBeenCalled();
    });
  });
});