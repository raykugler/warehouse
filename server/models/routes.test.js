const mongoose = require("mongoose");
const {MongoMemoryServer} = require('mongodb-memory-server');
const config = require('config');
const {Routes} = require('./routes');
const {Location} = require('./locations');


describe('Routes', () => {

  let location, route;

  const mongod = new MongoMemoryServer();
  route = {
    stagingLocation: '',
    routeCode: 'CT3',
    dsp: 'POLE'
  };

  beforeAll(async done => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    location = await Location({stagingLocation: '51'}).save();
    route.stagingLocation = location._id;
    done();
  });

  afterAll(async () => {
    await location.delete();
    await mongoose.disconnect();
    return await mongod.stop();
  });

  it('should create a route', function () {

    return Routes.create(route)
      .then(res => {
        expect(res).toHaveProperty('status');
        expect(res).toHaveProperty('counter');
        expect(res).toHaveProperty('stagingLocation');
        expect(res).toHaveProperty('routeCode');
        expect(res).toHaveProperty('dsp');
        expect(res).toHaveProperty('date');
      });
  });

  it('should return routes array', async () => {
    const res = await Routes.getAllRoutes();

    expect(res.length).toBe(1);
    expect(res[0]).toHaveProperty('status');
    expect(res[0]).toHaveProperty('counter');
    expect(res[0]).toHaveProperty('stagingLocation');
    expect(res[0]).toHaveProperty('routeCode');
    expect(res[0]).toHaveProperty('dsp');
    return expect(res[0]).toHaveProperty('date');
  });

  it('should return all routes', function () {
    return Routes.getAll().then(res => {
      return expect(res.length).toBe(1);
    })
  });

  it('should return same route for empty object', async () => {

    const _id = (await Routes.findOne({routeCode: route.routeCode}))._id;
    return Routes.update({_id}).then(res => {
      expect(String(res.stagingLocation))
        .toBe(String(route.stagingLocation));
    });
  });

  it('should update route', async () => {
    const item = (await Routes.findOne({stagingLocation: location._id})).toJSON();
    const newRoute = {...item};
    newRoute.status = 'finished';
    newRoute.counter = 2;
    newRoute.stagingLocation = mongoose.Types.ObjectId();
    newRoute.routeCode = 'test code';
    newRoute.dsp = 'test';

    const updatedRoute = (await Routes.update(newRoute)).toJSON();

    expect(updatedRoute).toHaveProperty('status', newRoute.status);
    expect(updatedRoute).toHaveProperty('counter', newRoute.counter);
    expect(updatedRoute).toHaveProperty('stagingLocation', newRoute.stagingLocation);
    return expect(updatedRoute).toHaveProperty('dsp', newRoute.dsp);
  });

  it('should delete routes', async () => {

    // Make sure that routes exist
    expect((await Routes.find()).length).toBe(1);

    // Remove routes
    await Routes.deleteAll();

    // Make sure that routes removed
    return expect((await Routes.find()).length).toBe(0);
  });
});