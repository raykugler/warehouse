const mongoose = require("mongoose");
const {MongoMemoryServer} = require('mongodb-memory-server');
const config = require('config');
const {Location} = require('./locations');


describe('Location', () => {

  let _id;
  const mongod = new MongoMemoryServer();

  const location = {
    stagingLocation: '46'
  };

  const routes = [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()];

  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    return await mongod.stop();
  });

  it('should create a location', function () {
    return Location.create(location).then(res => {
      const response = res.toJSON();
      _id = response._id;
      expect(response).toHaveProperty('routes', []);
      expect(response).toHaveProperty('stagingLocation',
        location.stagingLocation);
    })
  });

  it('should return an array of locations', function () {
    return Location.getAllLocations().then(res => {
      expect(res.length).toBe(1)
    })
  });

  it('should return a location by id', function () {
    return Location.getById(_id).then(res => {
      const response = res.toJSON();
      expect(response).toHaveProperty('routes', []);
      expect(response).toHaveProperty('stagingLocation',
        location.stagingLocation);
    });
  });

  it('should update location', function () {
    const loc = {...location, _id};
    loc.routes = routes;
    loc.stagingLocation = '1';
    return Location.update(loc).then(res => {
      const response = res.toJSON();
      expect(response).toHaveProperty('stagingLocation',
        loc.stagingLocation);
      expect(response).toHaveProperty('routes', loc.routes);
    })
  });

  it('should remove location', async () => {
    await Location.delById(_id);
    const loc = await Location.findById(_id);
    return expect(loc).toBe(null);
  });
});