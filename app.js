'use strict';

var express = require('express'),
    contentType = require('content-type'),
    concat = require('concat-stream'),
    load = require('express-load'),
    app = express(),
    getRawBody = require('raw-body'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    cfg = require('./tools/config').Config,
    http = require("http");

     

var path = require('path');
global.pathRootApp = path.resolve(__dirname);

app.use(methodOverride());
app.use(bodyParser.json({limit:1024102420, type:'application/json'}));
app.use(bodyParser.text());

app.use(function(req, res, next) {
     console.info('%s %s %s', req.method, req.url, req.path);
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     next();
  });

global.env = cfg.env;
global.cfg = cfg;

app.use('/', express.static(__dirname + '/public/', { 'index': 'index.html' }));


load('models')
    .then('controllers')
    .then('models')
    .then('util')
    .then('routes')
    .into(app);

 
app.use(cookieParser());

 
 
app.listen(cfg.httpPort, cfg.httpHost, function () {
    console.info("########################################################################");
    console.info("##              POWER        SERVER STARTED              POWER        ##");
    console.info("########################################################################");
    console.info('Enviroment: ', cfg.env);
    console.info('URL: ', cfg.httpHost + ":" + cfg.httpPort);
    console.info("------------------------------------------------------------------------");
});

console.info("------------------------------------------------------------------------");
