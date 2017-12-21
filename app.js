'use strict';

const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();
var port = process.env.PORT || 3000;

var indexRouter = require('./src/routes/indexRoutes')();
var hregRouter = require('./src/routes/hregRoutes')();
var htaskRouter = require('./src/routes/htaskRoutes')();
var yearDateFormat = 'YYYY';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/hreg', hregRouter);
app.use('/htask', htaskRouter);

app.locals.moment = moment;
app.locals.yearDateFormat = yearDateFormat;

app.listen(port, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Server is running on port ' + port);
    }
  });
