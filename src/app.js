const options = {
  auth : {
    secret: 'supersecret'
  }
};

const debug = require('debug')('app');
const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongooseService = require('../lib');
mongoose.connect('mongodb://localhost:27017/feathersjs-playground-app');

const feathers = require('@feathersjs/feathers');
const authentication = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');
const jwt = require('@feathersjs/authentication-jwt');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const promBundle = require("express-prom-bundle");
const metricsMiddleware = promBundle({includeMethod: true});


const middleware = require('./middleware');
const services = require('./services')(mongooseService, local, authentication);
const appHooks = require('./app.hooks');
const channels = require('./channels');

const app = express(feathers());

app.use(metricsMiddleware);

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());
app.configure(authentication({secret:'super'}))
app.configure(local());
app.configure(jwt());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);

// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
