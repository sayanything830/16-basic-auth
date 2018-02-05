'use strict';

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./error-handler');

const app = express();
const PORT = process.env.PORT;
const router = express.Router();
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors())
require('../route/route-auth')(router);
app.all('/{0,}', errorHandler(new Error('Path Error. Route not found.')));

const server = module.exports = {};
