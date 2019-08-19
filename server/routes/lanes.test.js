const express = require('express');
const request = require('supertest');
const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
const config = require('config');
const {Lane} = require('../models/lanes');
const lanes = require('./lanes');


describe('Lanes router', () => {

  const mongod = new MongoMemoryServer();
  let locations;

  beforeAll(async done => {

    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    });

    const location = new mongoose.Schema({
      stagingLocation: {type: String},
    });
    const Location = mongoose.model(String(config.get("locations.tableName")), location);
    locations = await Location.insertMany([
      {stagingLocation: "21"},
      {stagingLocation: "10"},
    ]);
    done();
  });

  afterAll(async () => {
    await Location.deleteMany(locations);
    await mongoose.disconnect();
    return await mongod.stop();
  });

  const app = express();
  app.use(express.json(config.get('configs.json')));
  app.use(express.urlencoded(config.get('configs.urlencoded')));
  app.use('/', lanes);
  const req = request(app);

  describe('GET /', () => {

    let lane, response;
    const query = () => req.get('/');

    beforeAll(async () => {
      const locs = locations.map(loc => loc._id);
      lane = await Lane({name: 'New lane', locations: locs}).save();
      response = (await query()).body;
    });

    afterAll(async () => {
      await lane.delete();
    });

    it('should return an array of lanes', function () {
      expect(response.length).toBe(1);
    });

    it('should contains id property', function () {
      expect(response[0]).toHaveProperty('_id', String(lane._id));
    });

    it('should have an array of locations', function () {
      expect(response[0].locations.length).toBe(locations.length);
    });

    it('should contains name property', function () {
      expect(response[0]).toHaveProperty('name', lane.name);
    });
  });

  describe('GET /:id', () => {

    let lane, response, url;

    const query = () => req.get(url);

    beforeAll(async () => {
      lane = await Lane({name: 'Name of the lane'}).save();
    });

    afterAll(async () => {
      await lane.delete();
    });

    describe('if id is valid', () => {

      beforeAll(async () => {
        url = `/${lane._id}`;
        response = (await query()).body;
      });

      it('should contains id', function () {
        expect(response).toHaveProperty('_id', String(lane._id));
      });

      it('should contains name', function () {
        expect(response).toHaveProperty('name', lane.name);
      });
    });

    describe('if id is invalid', () => {

      beforeAll(async () => {
        url = `/${mongoose.Types.ObjectId()}`;
        response = await query();
      });

      it('should return status code 400', function () {
        expect(response.status).toBe(400);
      });

      it('should return en error', function () {
        expect(response.body).toHaveProperty('error',
          config.get('errors.lanes.errc1'));
      });
    });
  });

  describe('POST /', () => {
    let lane, response;
    const query = () => req.post('/').send(lane);

    beforeAll(async () => {
      lane = {name: 'Lane name'};
      response = (await query()).body;
    });

    afterAll(async () => {
      await Lane.findOneAndDelete({_id: response._id});
    });

    it('should contains name', function () {
      expect(response).toHaveProperty('name', lane.name);
    });

    it('should contains locations', function () {
      expect(response).toHaveProperty('locations', []);
    });

    it('should contains id', function () {
      expect(response).toHaveProperty('_id');
    });
  });

  describe('PUT /:id', () => {

    let lane, response, url;

    const query = () => req.put(url).send(lane);

    describe('if lane data is valid', () => {
      beforeAll(async () => {
        lane = await Lane({name: 'Test name'}).save();
        lane.locations = locations.map(loc => loc._id);
        lane.name = 'new name';
        url = `/${lane._id}`;

        response = (await query()).body;
      });

      afterAll(async () => {

        await lane.delete();
        lane = null;
        response = null;
        url = null;
      });

      it('should update lane name', function () {
        expect(response).toHaveProperty('name', lane.name);
      });

      it('should contains an array of locations', function () {
        expect(response.locations.length).toBe(locations.length);
      });
    });

    describe('if request body does not have an id', () => {
      let data;
      beforeAll(async () => {
        lane = await Lane({name: 'Test name'}).save();
        url = `/${lane._id}`;
        data = {...lane.toJSON()};
        delete data._id;
        delete data.__v;

        response = (await req.put(url).send(data)).body;
      });


      afterAll(async () => {
        await lane.delete();
        lane = null;
        response = null;
        url = null;
      });

      it('should add id', function () {
        expect(response).toHaveProperty('_id', String(lane._id));
      });

      it('should has a name', function () {
        expect(response).toHaveProperty('name', lane.name);
      });
    });

    describe('if IDs does not match', () => {

      beforeAll(async () => {
        lane = await Lane({name: 'Test name'}).save();
        url = `/${mongoose.Types.ObjectId()}`;

        response = (await query()).body;
      });

      afterAll(async () => {
        await lane.delete();
        lane = null;
        response = null;
        url = null;
      });


      it('should return an error', function () {
        expect(response).toHaveProperty('error',
          config.get('errors.lanes.errc2'))
      });
    });

    describe('if lane not exists', () => {

      beforeAll(async () => {
        // This lane doesn't saved
        lane = await Lane({name: 'Test'});
        url = `/${lane._id}`;

        response = await query();
      });

      afterAll(() => {
        lane = null;
        response = null;
        url = null;
      });

      it('should return an error', function () {
        expect(response.body).toHaveProperty('error',
          config.get('errors.lanes.errc1'));
      });

      it('should return status code 400', function () {
        expect(response.status).toBe(400);
      });
    });
  });

  describe('DELETE /:id', () => {
    let lane, response, url;

    const query = () => req.delete(url);

    beforeAll(async () => {
      lane = await Lane({name: 'Test'}).save();
      url = `/${lane._id}`;
      response = (await query()).body;
    });

    afterAll(async () => {
      await lane.delete();
    });

    it('should contains created lane', function () {
      expect(lane).toHaveProperty('_id');
    });

    it('should contains confirm', function () {
      expect(response).toHaveProperty('ok', 1);
    });

    it('should contains deletedCount property', function () {
      expect(response).toHaveProperty('deletedCount', 1);
    });
  });
});