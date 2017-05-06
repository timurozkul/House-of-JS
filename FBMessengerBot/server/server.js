const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { index } = require('../routes/index');
const { bookings } = require('./models/bookings');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.use('/', index);

module.exports = app;