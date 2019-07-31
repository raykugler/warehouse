const routes = require('./routes');
const app = {
  use: jest.fn(),
  disable: jest.fn()
};


it('should call app use method 7 times', function () {
  routes(app);
  expect(app.use).toBeCalledTimes(7);
});

it('should call disable', function () {
  routes(app);
  expect(app.disable)
    .toHaveBeenCalledWith('x-powered-by')
});