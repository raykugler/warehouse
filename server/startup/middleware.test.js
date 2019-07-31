const middleware = require('./middleware');


it('should call app use method 2 times', function () {
  const app = {
    use: jest.fn(),
    get: () => ''
  };
  middleware(app);
  expect(app.use).toBeCalledTimes(2);
});

it('should call app use method 3 times', function () {
  const app = {
    use: jest.fn(),
    get: () => 'development'
  };
  middleware(app);
  expect(app.use).toBeCalledTimes(3);
});

it('should call app get method', function () {
  const app = {
    use: jest.fn(),
    get: jest.fn()
  };
  middleware(app);
  expect(app.get).toBeCalledWith('env');
});

