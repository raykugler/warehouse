const mongoose = require("mongoose");
const {MongoMemoryServer} = require('mongodb-memory-server');
const config = require('config');
const {Lane} = require('./lanes');

describe('Lane', () => {

  let lane, locations;
  const mongod = new MongoMemoryServer();

  const location = new mongoose.Schema({
    stagingLocation: {type: String}
  });

  const Location = mongoose.model(String(config.get("locations.tableName")), location);


  beforeAll(async () => {

    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    locations = await Location.insertMany([
      {stagingLocation: '51'},
      {stagingLocation: '12'}
    ]);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    return await mongod.stop();
  });

  it('should create a new lane', function () {
    return Lane.create({name: 'Lane A'}).then(res => {
      lane = res.toJSON();
      expect(lane).toHaveProperty('name');
    });
  });

  it('should return lane by id', function () {
    return Lane.getById(lane._id).then(res => {
      expect(res.toJSON()).toHaveProperty('name', lane.name);
      expect(res.toJSON()).toHaveProperty('locations', []);
    });
  });

  it('should return an array of lanes', function () {
    return Lane.getAllLanes().then(res => {
      expect(res.length).toBe(1);
    });
  });

  it('should update a lane', function () {
    const _lane = {...lane};
    _lane.name = 'Lane B';
    _lane.locations = locations.map(loc => loc._id);
    return Lane.update(_lane).then(res => {
      const response = res.toJSON();
      expect(response).toHaveProperty('locations');
      expect(response.locations.length).toBe(_lane.locations.length);
      expect(response).toHaveProperty('name', _lane.name);
    });
  });

  it('should remove this lane', async () => {
    await Lane.delById(lane._id);
    const res = await Lane.findById(lane._id);
    expect(res).toBe(null);
  });
});