const mongoose = require("mongoose");
const {MongoMemoryServer} = require('mongodb-memory-server');
const config = require('config');
const {Routes} = require('./routes');


describe('Routes', () => {

  let locations, route;

  const mongod = new MongoMemoryServer();
  const routes = [
    {
      stagingLocation: '',
      routeCode: 'CT3',
      dsp: 'POLE'
    },
    {
      stagingLocation: '',
      routeCode: 'CV7',
      dsp: 'JUTR'
    }
  ];

  const location = new mongoose.Schema({
    stagingLocation: {type: String}
  });

  const Location = mongoose.model(String(config.get("locations.tableName")), location);

  beforeAll(async done => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    locations = await Location.insertMany([
      {stagingLocation: '51'},
      {stagingLocation: '12'}
    ]);
    for (let i = 0; i < locations.length; i++) {
      routes[i].stagingLocation = locations[i]._id;
    }

    done();
  });

  afterAll(async () => {
    await Location.deleteMany({});
    await mongoose.disconnect();
    return await mongod.stop();
  });

  it('should create and return routes array', function () {

    return Routes.create(routes)
      .then(res => {
        expect(res.length).toBe(routes.length);
        expect(res[0]).toHaveProperty('status');
        expect(res[0]).toHaveProperty('counter');
        expect(res[0]).toHaveProperty('stagingLocation');
        expect(res[0]).toHaveProperty('routeCode');
        expect(res[0]).toHaveProperty('dsp');
        expect(res[0]).toHaveProperty('date');
      });
  });

  it('should return routes array', async () => {
    const res = await Routes.getCurrent();
    expect(res.length).toBe(routes.length);
    expect(res[0]).toHaveProperty('status');
    expect(res[0]).toHaveProperty('counter');
    expect(res[0]).toHaveProperty('stagingLocation');
    expect(res[0]).toHaveProperty('routeCode');
    expect(res[0]).toHaveProperty('dsp');
    route = res[0].toJSON();
    return expect(res[0]).toHaveProperty('date');
  });

  it('should return all routes', function () {
    return Routes.getAll().then(res => {
      console.log(res);
      return expect(res.length).toBe(routes.length);
    })
  });

  it('should return same route for empty object', function () {
    return Routes.update({_id: route._id}).then(res => {
      expect(String(res.stagingLocation))
        .toBe(String(route.stagingLocation));
    });
  });

  it('should update route', async () => {
    const item = (await Routes.findOne({stagingLocation: locations[0]._id})).toJSON();
    const newRoute = {...item};
    newRoute.status = 'finished';
    newRoute.counter = 2;
    newRoute.stagingLocation = locations[1]._id;
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
    expect((await Routes.find()).length)
      .toBe(routes.length);

    // Remove routes
    await Routes.deleteAll();

    // Make sure that routes removed
    return expect((await Routes.find()).length)
      .toBe(0);
  });
});