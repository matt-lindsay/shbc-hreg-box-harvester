// Remote execution script.

"use strict";

const http = require('http');
let results = {};

http.get('http://172.23.234.60:3000/getData/', function(response) {
    response.setEncoding('utf-8');
    response.on('data', results);
    response.on('error', console.error);
    response.on('end', console.log('API Results: ' + results));
  }).on('error', console.error);
