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

    let routes, response;
    const query = () => req.post('/').send(routes);

    beforeAll(async done => {
      routes = [
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
      ];
      response = (await query()).body;
      done();
    });

    afterAll(async done => {
      await Routes.deleteMany({});
      done();
    });

    it('should create an array of routes', function () {
      expect(response.length).toBe(routes.length);
    });

    it('should contains an id of route', function () {
      expect(response[0]).toHaveProperty('_id');
    });

    it('should contains status property', function () {
      expect(response[0]).toHaveProperty('status');
    });

    it('should contains stagingLocation property', function () {
      expect(response[0]).toHaveProperty('stagingLocation');
    });

    it('should contains routeCode property', function () {
      expect(response[0]).toHaveProperty('routeCode');
    });

    it('should contains dsp property property', function () {
      expect(response[0]).toHaveProperty('dsp');
    });

    it('should contains date property', function () {
      expect(response[0]).toHaveProperty('date');
    });
  });
});