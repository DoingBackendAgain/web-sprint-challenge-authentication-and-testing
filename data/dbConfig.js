// do not make changes to this file
const knex = require('knex');
const { development } = require('../knexfile.js');
const knexConfig = require('../knexfile.js');
//const environment = process.env.NODE_ENV || 'development';

module.exports = knex(knexConfig.development);
