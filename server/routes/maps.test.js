const express = require('express');
const request = require('supertest');
const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
const config = require('config');
const {Map} = require('../models/maps');
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

    let map, response;

    const query = () => req.get('/current');

    describe('if exists default map', () => {

      beforeAll(async () => {
        map = await Map({name: 'Current map', default: true}).save();
        response = (await query()).body;
      });

      afterAll(async () => {
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
    });

    describe('if there no default map', () => {

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
  });

  describe('PUT /:id', () => {

    let map, response, url;

    const query = () => req.put(url).send(map);

    beforeAll(async () => {
      map = await Map({name: 'New map'}).save();
      map.default = true;
      map.name = "updated name";
      map.lanes.push(mongoose.Types.ObjectId());

      url = `/${map._id}`;
    });

    afterAll(async () => {
      await map.delete();
    });

    describe('if map have an id', () => {

      beforeAll(async () => {
        response = (await query()).body;
      });

      it('should contains new name', function () {
        expect(response).toHaveProperty('name', map.name);
      });

      it('should contains default', function () {
        expect(response).toHaveProperty('default', map.default);
      });

      it('should contains new line', function () {
        expect(response.lanes.length).toBe(map.lanes.length);
      });
    });

    describe('if map does not have an id', () => {
      let body, resp;

      beforeAll(async () => {
        body = {...map.toJSON()};
        delete body._id;
        resp = (await req.put(url).send(body)).body;
      });

      it('should contains a new name', function () {
        expect(resp).toHaveProperty('name', body.name);
      });

      it('should contains default', function () {
        expect(resp).toHaveProperty('default', body.default);
      });

      it('should contains new line', function () {
        expect(resp.lanes.length).toBe(body.lanes.length);
      });
    });

    describe('if map id does not match with url id', () => {

      beforeAll(async () => {
        map._id = mongoose.Types.ObjectId();
        response = (await query()).body;
      });

      it('should contains an error property', function () {
        expect(response).toHaveProperty('error',
          config.get('errors.maps.errc3'));
      });
    });

    describe('if map _id does not exist', () => {

      beforeAll(async () => {
        const id = mongoose.Types.ObjectId();
        map._id = id;
        url = `/${id}`;
        response = (await query()).body;
      });

      it('should return an error', function () {
        expect(response).toHaveProperty('error',
          config.get('errors.maps.errc2'));
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