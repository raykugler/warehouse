const mongoose = require("mongoose");
const {MongoMemoryServer} = require('mongodb-memory-server');
const {Routes} = require('./routes');


describe('Routes', () => {

  const mongod = new MongoMemoryServer();
  const routes = [{loc: '51'}, {loc: '12'}];

  beforeAll(async done => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    done();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    return await mongod.stop();
  });

  it('should create and return routes array', function () {

    return Routes.create({routes})
      .then(res => {
        return expect(res.toJSON())
          .toHaveProperty('routes', routes);
      });
  });

  it('should return routes array', async () => {
    const result = (await Routes.getCurrent()).toJSON();
    return expect(result)
      .toHaveProperty('routes', routes);
  });

  it('should update routes', async () => {
    const updatedRoutes = [...routes];
    updatedRoutes[0].loc = '8';
    const result = await Routes.update({routes: updatedRoutes});
    return expect(result.toJSON())
      .toHaveProperty('routes', updatedRoutes);
  });

  it('should delete routes', async () => {

    // Make sure that routes exist
    expect(await Routes.getCurrent() === null)
      .toBe(false);

    // Remove routes
    await Routes.deleteCurrent();

    // Make sure that routes removed
    return expect(await Routes.getCurrent() === null)
      .toBe(true);
  });
});