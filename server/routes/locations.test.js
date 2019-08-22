const express = require('express');
const request = require('supertest');
const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
const config = require('config');
const {Location} = require('../models/locations');
const locations = require('./locations');


describe('Locations router', () => {

  const mongod = new MongoMemoryServer();
  let routes, Route;

  const app = express();
  app.use(express.json(config.get('configs.json')));
  app.use(express.urlencoded(config.get('configs.urlencoded')));
  app.use('/', locations);
  const req = request(app);

  beforeAll(async done => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    });

    const _routes = new mongoose.Schema({
      routeCode: {type: String}
    });

    Route = mongoose.model(String(config.get("routes.tableName")), _routes);

    routes = await Route.insertMany([
      {routeCode: 'CX2'},
      {routeCode: 'CT5'}
    ]);
    done();
  });

  afterAll(async () => {
    await Route.deleteMany(routes);
    await mongoose.disconnect();
    await mongod.stop();
  });

  describe('GET /', () => {

    let location, response;
    const query = () => req.get('/');

    beforeAll(async () => {
      location = await Location({stagingLocation: '53'}).save();
      response = (await query()).body;
    });

    it('should return an array of locations', function () {
      expect(response.length).toBe(1);
    });

    it('should contains id property', function () {
      expect(response[0]).toHaveProperty('_id', String(location._id))
    });

    it('should contyains stagingLocation', function () {
      expect(response[0]).toHaveProperty(
        'stagingLocation',
        location.stagingLocation)
    });
  });

  describe('GET /:id', () => {

    let location, response, url;

    const query = () => req.get(url);

    beforeAll(async () => {
      location = await Location({stagingLocation: '1'}).save();
    });

    describe('if location does not exist', () => {

      beforeAll(async () => {
        url = `/${mongoose.Types.ObjectId()}`;
        response = await query();
      });

      afterAll(() => {
        url = null;
        response = null;
      });

      it('should return status code 400', function () {
        expect(response.status).toBe(400);
      });

      it('should return an error', function () {
        expect(response.body).toHaveProperty('error',
          config.get('errors.locations.errc1'));
      });
    });

    describe('if location exists', () => {

      beforeAll(async () => {
        url = `/${location._id}`;
        response = (await query()).body;
      });

      afterAll(() => {
        url = null;
        response = null;
      });

      it('should contains id', function () {
        expect(response).toHaveProperty('_id', String(location._id));
      });

      it('should contains stagingLocation', function () {
        expect(response).toHaveProperty('stagingLocation',
          location.stagingLocation);
      });
    });
  });

  describe('POST /', () => {

    let data, response;

    const query = () => req.post('/').send(data);

    beforeAll(async () => {
      data = {stagingLocation: '5'};
      response = await query();
    });

    it('should return status code 200', function () {
      expect(response.status).toBe(200);
    });

    it('should contains location id', function () {
      expect(response.body).toHaveProperty('_id');
    });

    it('should contains stagingLocation', function () {
      expect(response.body).toHaveProperty(
        'stagingLocation',
        data.stagingLocation);
    });

    it('should contains routes', function () {
      expect(response.body).toHaveProperty('routes', [])
    });

    it('should return same location if it exists', () => {
      return query().then(res => {
        expect(res.body._id).toBe(response.body._id);
      });
    });
  });

  describe('PUT /:id', () => {

    let location, response, url;

    const query = () => req.put(url).send(location);

    describe('if data is valid', () => {

      beforeAll(async () => {
        location = await Location({stagingLocation: '35'}).save();
        location.routes = routes.map(route => route._id);
        location.stagingLocation = '18';

        url = `/${location._id}`;
        response = await query();
      });

      afterAll(async () => {
        await location.delete();
        url = null;
        response = null
      });

      it('should return status code 200', function () {
        expect(response.status).toBe(200);
      });

      it('should contains id', function () {
        expect(response.body).toHaveProperty('_id', String(location._id));
      });

      it('should contains stagingLocation', function () {
        expect(response.body).toHaveProperty(
          'stagingLocation',
          location.stagingLocation);
      });

      it('should contains an array of routes', function () {
        expect(response.body.routes.length).toBe(routes.length);
      });
    });

    describe('if location does not exist', () => {

      beforeAll(async () => {
        // Create but not save the location
        location = await Location({stagingLocation: '35'});
        location.routes = routes.map(route => route._id);
        location.stagingLocation = '18';

        url = `/${location._id}`;
        response = await query();
      });

      afterAll(async () => {
        await location.delete();
        url = null;
        response = null
      });

      it('should return status code 400', function () {
        expect(response.status).toBe(400);
      });

      it('should contains error message', function () {
        expect(response.body).toHaveProperty('error',
          config.get('errors.locations.errc1'));
      });
    });

    describe('if user change the staging location to unavailable', () => {
      let tempLocation, loc;

      beforeAll(async () => {
        tempLocation = await Location({stagingLocation: 'taken'}).save();
        loc = await Location({stagingLocation: '24'}).save();
        location = loc.toJSON();
        location.stagingLocation = 'taken';

        url = `/${location._id}`;
        response = await req.put(url).send(location);


      });

      afterAll(async () => {
        await loc.delete();
        await tempLocation.delete();
        await location.delete();
        loc = null;
        url = null;
        response = null
      });

      it('should return status code 400', function () {
        expect(response.status).toBe(400);
      });

      it('should contains an error', function () {
        expect(response.body).toHaveProperty('error',
          config.get('errors.locations.errc3'));
      });
    });
  });

  describe('DELETE /:id', () => {

    let location, response, url;

    const query = () => req.delete(url);

    beforeAll(async () => {
      location = await Location({stagingLocation: '12'}).save();
      url = `/${location._id}`;
      response = await query();
    });

    it('should return status code 200', function () {
      expect(response.status).toBe(200);
    });

    it('should contains ok property', function () {
      expect(response.body).toHaveProperty('ok', 1);
    });

    it('should contains deletedCount property', function () {
      expect(response.body).toHaveProperty('deletedCount', 1);
    });
  });
});