'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
var compression = require('compression');
require('dotenv').config({ path: './variables.env' });
app.use(compression()); //use compression
app.use(bodyParser.json({ limit: "50mb" ,strict: false }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000 }));
app.use(expressValidator());
app.use(cors());
const db = require('./middlewares/db');
app.use(db.connectToDatabase)
const routes = require('./routes/routes.js')
app.use('/', routes);

module.exports = app;
