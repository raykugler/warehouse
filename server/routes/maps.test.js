const express = require('express');
const request = require('supertest');
const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
const config = require('config');
const {Map} = require('../models/maps');
const {Lane} = require('../models/lanes');
const {Location} = require('../models/locations');
const maps = require('./maps');


describe('maps route', () => {

  const mongod = new MongoMemoryServer();

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

  const app = express();
  app.use(express.json(config.get('configs.json')));
  app.use(express.urlencoded(config.get('configs.urlencoded')));
  app.use('/', maps);
  const req = request(app);

  describe('GET /', () => {

    let map, response;

    const query = () => req.get('/');

    beforeAll(async () => {

      map = await Map({
        name: "test name"
      }).save();

      response = (await query()).body;
    });

    afterAll(async () => {
      await map.delete();
    });

    it('should return array or maps', function () {
      expect(response.length).toBe(1);
    });

    it('should contains _id property', function () {
      expect(response[0]).toHaveProperty('_id');
    });

    it('should contains name property', function () {
      expect(response[0]).toHaveProperty('name', map.name);
    });

    it('should contains default property', function () {
      expect(response[0]).toHaveProperty('default', map.default);
    });

    it('should contains lanes property', function () {
      expect(response[0]).toHaveProperty('lanes', []);
    });
  });

  describe('GET /current', () => {

    const query = () => req.get('/current');

    afterEach(async done => {
      await Map.deleteMany({});
      done();
    });

    describe('if there no default map', () => {

      let map, response;

      beforeAll(async () => {
        map = await Map({name: 'Current map', default: false}).save();
        response = (await query()).body;
      });

      afterAll(async () => {
        await map.delete();
        map = null;
        response = null;
      });

      it('should ', function () {
        expect(response).toHaveProperty('error',
          config.get('errors.maps.errc1'));
      });
    });

    describe('if exists default map', () => {

      let map, response, laneA, laneB, locationsA, locationsB;

      beforeAll(async () => {

        locationsA = await Location.insertMany([
          {stagingLocation: '1010'},
          {stagingLocation: '1030'},
        ]);
        laneA = await Lane({
          name: 'Test Lane A',
          locations: locationsA.map(a => a._id)
        }).save();

        locationsB = await Location.insertMany([
          {stagingLocation: '33333'}
        ]);

        laneB = await Lane({
          name: 'Test Lane B',
          locations: locationsB.map(b => b._id)
        }).save();

        const lanes = [laneA._id, laneB._id];


        map = await Map({name: 'Test Default Map Object', default: true, lanes}).save();
        response = (await query()).body;
      });

      afterAll(async () => {
        await laneA.delete();
        await laneB.delete();
        await locationsA.delete();
        await locationsB.delete();
        await map.delete();
        map = null;
        response = null;
      });

      it('should contains _id property', function () {
        expect(response).toHaveProperty('_id');
      });

      it('should contains default property', function () {
        expect(response).toHaveProperty('default', true);
      });

      it('should contains name', function () {
        expect(response).toHaveProperty('name', map.name)
      });

      it('should contains lane A', function () {
        const lanes = response.lanes.map(l => l._id);
        expect(lanes).toContain(String(laneA._id));
      });

      it('should contains lane B', function () {
        const lanes = response.lanes.map(l => l._id);
        expect(lanes).toContain(String(laneB._id));
      });

      it('should contains an array of locations in laneA', function () {
        const _laneA = response.lanes.filter(l => l._id === String(laneA._id))[0];
        expect(_laneA.locations.length).toBe(locationsA.length);
      });
    });
  });

  describe('POST /', () => {

    let data, response;
    const query = () => req.post('/').send(data);

    beforeAll(async () => {
      data = {name: "Test map"};
      response = (await query()).body;
    });

    afterAll(async () => {
      await Map.deleteOne({_id: response._id});
    });

    it('should contains _id property', function () {
      expect(response).toHaveProperty('_id');
    });

    it('should contains name', function () {
      expect(response).toHaveProperty('name', data.name);
    });

    it('should contains default property', function () {
      expect(response).toHaveProperty('default', false);
    });

    it('should contains lanes property', function () {
      expect(response).toHaveProperty('lanes', []);
    });

    it('should return same map if map already exists', function () {
      return query().then(res => {
        return expect(res.body._id).toBe(response._id);
      })
    });
  });

  describe('PUT /:id', () => {

    let map, response, url;

    const query = () => req.put(url).send(map);

    describe('if map _id does not exist', () => {

      beforeAll(async () => {
        map = {name: 'Some name'};
        const id = mongoose.Types.ObjectId();
        map._id = id;
        url = `/${id}`;

        response = (await query()).body;
      });

      afterAll(async () => {
        await map.delete();
        response = null;
        url = null;
      });

      it('should return an error', function () {
        expect(response).toHaveProperty('error',
          config.get('errors.maps.errc2'));
      });
    });

    describe('if map name is taken', () => {
      let conflict_map, conflict_name;

      beforeAll(async () => {
        conflict_name = 'conflict name';
        conflict_map = await Map({name: conflict_name}).save();

        map = await Map({name: 'New map'}).save();
        map.default = true;
        map.name = "updated name";
        map.lanes.push(mongoose.Types.ObjectId());
        map.name = conflict_name;

        url = `/${map._id}`;
        response = await query();
      });

      afterAll( async () => {
        await conflict_map.delete();
        await map.delete();
      });

      it('should return status code 400', function () {
        expect(response.status).toBe(400);
      });

      it('should contains an error', function () {
        expect(response.body).toHaveProperty('error',
          config.get('errors.maps.errc4'));
      });
    });

    describe('if data is valid', () => {

      beforeAll(async () => {
        map = await Map({name: 'Map with valid name'}).save();
        url = `/${map._id}`;

        response = await query();
      });

      afterAll(async () => {
        await map.delete();
        url = null;
      });

      it('should return status code 200', function () {
        expect(response.status).toBe(200);
      });

      it('should contains map id', function () {
        expect(response.body).toHaveProperty('_id', String(map._id));
      });

      it('should contains map name', function () {
        expect(response.body).toHaveProperty('name', map.name);
      });

      it('should contains map lanes', function () {
        expect(response.body).toHaveProperty('lanes', []);
      });
    });
  });

  describe('DELETE /', () => {

    let map, response, url;

    const query = () => req.delete(url);

    beforeAll(async () => {
      map = await Map({name: "Test"}).save();
      url = `/${map._id}`;
      response = (await query()).body;
    });

    afterAll(async () => {
      await map.delete();
    });

    it('should return confirm', function () {
      expect(response).toHaveProperty('ok', 1);
    });

    it('should contains deleteCount property', function () {
      expect(response).toHaveProperty('deletedCount', 1);
    });
  });
});