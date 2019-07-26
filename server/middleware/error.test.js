const winston = require("winston");
const error = require('./error');

jest.mock('winston', () => ({
  error: jest.fn()
}));

const res = {
  status: jest.fn().mockImplementation(() => ({send: jest.fn()}))
};
const errText = "some error";
const next = jest.fn();
error(errText, {}, res, next);

it('should not call next if error', function () {
  expect(next).not.toHaveBeenCalled();
});

it('should call status 500', function () {
  expect(res.status).toHaveBeenCalledWith(500);
});

it('should call winston.error', function () {
  expect(winston.error)
    .toHaveBeenCalledWith(errText);
});