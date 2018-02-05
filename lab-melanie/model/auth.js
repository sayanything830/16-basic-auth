'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const Auth = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  compareHash: {type: String, unique: true},
}, {timestamps: true});

Auth.methods.generatePasswordHash = function(password) {
  if(!password) return Promise.reject(new Error('Auth failed, password required.'))

  return bcrypt.hash(password, 10)
    .then(hash => this.password = hash)
    .then(() => this);
    //.catch(err => err)
};

Auth.methods.comparePasswordHash = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if(err) return reject(err);
      if(!valid) return reject(new Error('Auth failed, password invalid.'));
      resolve(this);
    });
  });
};

Auth.methods.generateCompareHash = function() {
  this.compareHash = cryto.randnomBytes(32).toString('hex'); // try console logging this to see output
  return this.save()
    .then(() => Promise.resolve(this.compareHash))
    .catch(() => this.generateCompareHash()) //possible infinite loop
};

Auth.methods.generateToken = function() {
  return this.generateCompareHash()
  .then(compareHash => jwt.sign(compareHash, process.env.APP_SECRET))
  // .catch(err => err)
};

module.exports = mongoose.model('auth', Auth);