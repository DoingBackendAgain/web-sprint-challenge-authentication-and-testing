const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookie = require("cookie-parser")
//require("dotenv").config()
//const session = require("express-session")
//const knexSessionStore = require("connect-session-knex")(session)

const {restrict} = require('./middleware/restricted.js');
const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');
//const dbConfig = require('../data/dbConfig.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(cookie())
server.use(express.json());
// server.use(session({
//     resave: false,
//     saveUninitialized: false,
//     seret: process.env.JWT_SECRET,
//     store: new knexSessionStore({
//         knex: dbConfig,
//         createtable: true
//     })
// }))


server.use('/api/auth',  authRouter);
server.use('/api/jokes', jokesRouter); // only logged-in users should have access!

module.exports = server;
