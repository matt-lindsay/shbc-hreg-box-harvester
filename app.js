'Use Strict';

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();
var port = process.env.PORT || 3000;

var indexRouter = require('./src/routes/indexRoutes')();
var yearDateFormat = 'YYYY';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRouter);

app.locals.moment = moment;
app.locals.yearDateFormat = yearDateFormat;

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log('Server is running on port ' + port);
});