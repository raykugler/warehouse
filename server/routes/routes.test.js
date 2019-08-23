const express = require('express');
const request = require('supertest');
const routes = require('./routes');
const config = require('config');
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const {Routes} = require('../models/routes');


describe('routes router', () => {


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
  app.use('/', routes);
  const req = request(app);

  describe('GET /', () => {

    let routes, response;
    const query = () => req.get('/');

    beforeAll(async done => {
      routes = await Routes.insertMany([
        {
          stagingLocation: mongoose.Types.ObjectId(),
          routeCode: 'CX1',
          dsp: 'TEST'
        },
        {
          stagingLocation: mongoose.Types.ObjectId(),
          routeCode: 'CV32',
          dsp: 'DDLP'
        }
      ]);
      response = (await query()).body;
      done();
    });

    afterAll(async done => {
      await Routes.deleteMany({});
      done();
    });

    it('should check that response is an array', function () {
      expect(response.length).toBe(routes.length);
    });

    it('should contains an id', function () {
      expect(response[0]).toHaveProperty('_id');
    });

    it('should contains status', function () {
      expect(response[0]).toHaveProperty('status');
    });

    it('should contains stagingLocation', function () {
      expect(response[0]).toHaveProperty('stagingLocation');
    });
    it('should contains routeCode', function () {
      expect(response[0]).toHaveProperty('routeCode');
    });

    it('should contains dsp property', function () {
      expect(response[0]).toHaveProperty('dsp');
    });

    it('should contains date', function () {
      expect(response[0]).toHaveProperty('date');
    });
  });

  describe('POST /', () => {

    let route, response;
    const query = () => req.post('/').send(route);

    beforeAll(async done => {
      route = {
        stagingLocation: mongoose.Types.ObjectId(),
        routeCode: 'CX1',
        dsp: 'TEST'
      };
      response = (await query()).body;
      done();
    });

    afterAll(async done => {
      await Routes.deleteMany({});
      done();
    });

    it('should contains an id of the route', function () {
      expect(response).toHaveProperty('_id');
    });

    it('should contains status property', function () {
      expect(response).toHaveProperty('status');
    });

    it('should contains stagingLocation property', function () {
      expect(response).toHaveProperty('stagingLocation');
    });

    it('should contains routeCode property', function () {
      expect(response).toHaveProperty('routeCode');
    });

    it('should contains dsp property property', function () {
      expect(response).toHaveProperty('dsp');
    });

    it('should contains date property', function () {
      expect(response).toHaveProperty('date');
    });

    it('should return route if it exists', function () {
      return query().then(res => {
        // console.log(res)
      })
    });
  });

  describe('PUT /:id', () => {

    let route, response, url;

    const query = () => req.put(url).send(route);

    describe('if conflict of routeCode', () => {
      let conflictRouteCode = 'conflictRouteCode', conflictRoute;

      beforeAll(async done => {
        conflictRoute = await Routes({
          stagingLocation: mongoose.Types.ObjectId(),
          routeCode: conflictRouteCode,
          dsp: 'Test DSP'
        }).save();
        route = await Routes({
          stagingLocation: mongoose.Types.ObjectId(),
          routeCode: 'CX205',
          dsp: 'Test DSP'
        }).save();

        route.routeCode = conflictRouteCode;

        url = `/${route._id}`;

        response = await query();
        done();
      });

      afterAll(async () => {
        await conflictRoute.delete();
        await route.delete();
        url = null;
        response = null;
      });

      it('should return status code 400', function () {
        expect(response.status).toBe(400);
      });

      it('should contains an error', function () {
        expect(response.body).toHaveProperty('error',
          config.get('errors.routes.errc6'));
      });
    });

    describe('if route do not exist', () => {

      beforeAll(async () => {
        // Create but don't store route to database
        route = await Routes({
          stagingLocation: mongoose.Types.ObjectId(),
          routeCode: 'CT24',
          dsp: 'Test'
        });
        url = `/${route._id}`;
        response = await query();
      });

      afterAll(() => {
        url = null;
        route = null;
        response = null;
      });

      it('should return status code 400', function () {
        expect(response.status).toBe(400);
      });

      it('should contains an error', function () {
        expect(response.body).toHaveProperty('error',
          config.get('errors.routes.errc3'));
      });
    });

    describe('if route data is valid', () => {

      beforeAll(async () => {
        route = await Routes({
          stagingLocation: mongoose.Types.ObjectId(),
          routeCode: 'CV88',
          dsp: 'Test update dsp'
        }).save();

        route.stagingLocation = mongoose.Types.ObjectId();
        route.routeCode = 'CT100';
        route.dsp = 'new dsp';
        route.counter = 0;
        route.status = 'New status';

        url = `/${route._id}`;
        response = await query();
      });

      afterAll(async () => {
        await route.delete();
        response = null;
        url = null;
      });

      it('should return status code 200', function () {
        expect(response.status).toBe(200);
      });

      it('should contains id', function () {
        expect(response.body).toHaveProperty('_id', String(route._id));
      });

      it('should contains stagingLocation', function () {
        expect(response.body).toHaveProperty('stagingLocation',
          String(route.stagingLocation));
      });

      it('should contains dsp property', function () {
        expect(response.body).toHaveProperty('dsp', route.dsp);
      });

      it('should contains routeCode property', function () {
        expect(response.body).toHaveProperty('routeCode', route.routeCode);
      });

      it('should contains counter property', function () {
        expect(response.body).toHaveProperty('counter', route.counter);
      });

      it('should contains status property', function () {
        expect(response.body).toHaveProperty('status', route.status);
      });
    });
  });

  describe('DELETE /:id', () => {

    let route, response, url;
    const query = () => req.delete(url);

    beforeAll(async () => {
      route = await Routes({
        stagingLocation: mongoose.Types.ObjectId(),
        routeCode: 'CT82',
        dsp: 'Test delete'
      }).save();

      url = `/${route._id}`;

      response = await query();
    });

    afterAll(async () => {
      await route.delete();
      url = null;
      response = null;
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