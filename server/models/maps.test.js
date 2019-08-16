const mongoose = require("mongoose");
const {MongoMemoryServer} = require('mongodb-memory-server');
const config = require('config');
const {Map} = require('./maps');


describe('Map', () => {

  let map, lanes;
  const mongod = new MongoMemoryServer();

  const Lanes = mongoose.model(
    String(config.get("locations.tableName")),
    new mongoose.Schema());

  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    });

    lanes = await Lanes.insertMany([{}, {}]);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    return await mongod.stop();
  });

  it('should create a map', function () {
    const name = 'Test map';
    return Map.create({name}).then(res => {
      map = res.toJSON();
      expect(map).toHaveProperty('lanes', []);
      expect(map).toHaveProperty('name', name);
      expect(map).toHaveProperty('default', false);
    })
  });

  it('should return a map by id', function () {
    return Map.getById(map._id).then(res => {
      const response = res.toJSON();
      expect(response).toHaveProperty('default', map.default);
      expect(response).toHaveProperty('lanes', map.lanes);
      expect(response).toHaveProperty('name', map.name);
    })
  });

  it('should update the map', function () {
    const _map = {...map};
    _map.name = 'New name';
    _map.lanes = lanes.map(lane => lane._id);
    _map.default = true;

    return Map.update(_map).then(res => {
      const response = res.toJSON();
      expect(response).toHaveProperty('default', _map.default);
      expect(response).toHaveProperty('lanes', _map.lanes);
      expect(response).toHaveProperty('name', _map.name);
    })
  });
});