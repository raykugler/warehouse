const config = require('../lib/config');
jest.mock('../lib/config', () => ({
  get: jest.fn().mockImplementation(() => null)
}));
const configuration = require('./config');

it('should throw an error', function () {

  try {
    configuration()
  } catch (e) {
    expect(e.message).toBe("FATAL ERROR: jwtPrivateKey is not defined")
  }
});

it('should not throw an error', function () {
  config.get.mockImplementation(str => str);
  expect(configuration()).toBe(undefined);
});