const express = require('express');
const home = require('./home');
const request = require('supertest');

describe('home router', () => {

  const app = express();
  app.use('/', home);

  const req = request(app);

  it('should return an error on GET', async () => {

    const res = await req.get('/test');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty(
      'error',
      "Cannot find this page")
  });

  it('should return an error on POST', async () => {

    const res = await req.post('/test');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty(
      'error',
      "Cannot create anything with given url")
  });

  it('should return an error on PUT', async () => {

    const res = await req.put('/test');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty(
      'error',
      "Cannot update anything with given url");
  });

  it('should return an error on DELETE', async () => {

    const res = await req.delete('/test');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty(
      'error',
      "Cannot delete anything with given url");
  });

  it('should return an error on unsupported method', async () => {

    const res = await req.patch('/test');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      'error',
      "Server doesn't support PATCH queries");
  });
});
