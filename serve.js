'use strict';

var express = require('express');
const path = require('path'); 
const compression = require('compression');
const bodyparser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const domRoutes = require('./routes/dom.routes');
const changesRoutes = require('./routes/changes');

module.exports.create = function (server, host, port, publicDir) {
  var app = express();
  app.use(compression());
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: false }));
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(express.static(publicDir));
  // Api headers configurations
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
  app.use('/', indexRouter);
  app.use('/dom', domRoutes);
  app.use('/api', changesRoutes);
  return app;
};
