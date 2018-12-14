'use strict'

// Calling Dependencies
const mariadb = require('mariadb');

const user = process.env.USRMARIADB;
const pass = process.env.PASSMARIADB;
const port = process.env.PORTMARIADB;
const host = process.env.HOSTMARIADB;

// Pool connection mariadb
var pool = mariadb.createPool({
  host: '127.0.0.1',
  user: user,
  port: '3308',
  password: 'avatar',
  database: 'devchange_bd',
  connectTimeout: 1500,
  connectionLimit: 100
});

module.exports = pool;