'use strict';

const faker = require('faker');
const Auth = require('../../model/auth.js');


const mock = module.exports = {};

// Auth Mocks - One, Many, RemoveAll
mock.auth = {};

mock.auth.createOne = () => new Auth({
  username: faker.name.firstName(),
  password: faker.hacker.phrase(),
  email: faker.internet.email(),
}).save();

mock.auth.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.auth.createOne));

mock.auth.removeAll = () => Promise.all([Auth.remove()]);
