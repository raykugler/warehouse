const routes = require('./routes');
const app = {
  use: jest.fn(),
  disable: jest.fn()
};


it('should call app use method', function () {
  routes(app);
  expect(app.use).toBeCalled();
});

it('should call disable', function () {
  routes(app);
  expect(app.disable)
    .toHaveBeenCalledWith('x-powered-by')
});