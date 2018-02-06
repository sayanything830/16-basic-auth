'use strict';

const server = require('../../lib/server.js');
const superagent = require('superagent');
const Auth = require('../../model/auth.js');
const mock = require('../lib/mock.js');
const faker = require('faker');
require('jest');

describe('GET', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  // afterAll(mock.auth.removeAll);
  afterAll(() => Promise.all([Auth.remove()]));


  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/signup')
        .send(new Auth({
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
        }))
        .then(res => this.response = res)
        .then(() => {
          return superagent.get(':4000/api/v1/signin')
            .auth(this.response.request._data.username, this.response.request._data.auth)
            .then(res => this.user = res);
        });
    });
    // beforeAll(() => {
    //   return mock.auth.createOne()
    //     .then(data => {
    //       console.log(data);
    //       this.authData = data.auth;
    //       return superagent.get('4000/api/v1/signin')
    //         .auth(this.authData.username, data.password)
    //         .then(res => this.response = res)
    //         .catch(err => console.log(err));
    //     });
    // });
    it('should return a status of 200', () => {
      console.log(this.user.body);
      expect(this.res.status).toBe(200);
    });
  });
});