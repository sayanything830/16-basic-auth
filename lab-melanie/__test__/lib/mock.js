'use strict';

const faker = require('faker');
const Auth = require('../../model/auth.js');


const mock = module.exports = {};

// Auth Mocks - One, Many, RemoveAll
mock.auth = {};

mock.auth.createOne = () => {
  let result = {};
  result.password = faker.internet.password();

  let auth = new Auth({
    username: faker.internet.userName(),
    email: faker.internet.email(),
  });

  return auth.generatePasswordHash(result.password)
    .then(auth => {
      result.auth = auth;
      return auth.save();
    })
    .then(auth => auth.generateToken())
    .then(token => {
      result.token = token;
      return result;
    });
};



mock.auth.removeAll = () => Promise.all([Auth.remove()]);
