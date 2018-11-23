'use strict';
let path = require('path');
global.pathRootApp = path.resolve(__dirname);


let express = require('express')
let load = require('express-load')
let app = express()
let bodyParser = require('body-parser')
let methodOverride = require('method-override')
let cookieParser = require('cookie-parser')
let cfg = require('./tools/config').Config
let Security = require('./tools/security');
require('./tools/websocket-server')




global.env = cfg.env;
global.cfg = cfg;


app.use(Security.cors)
app.use(methodOverride());
app.use(bodyParser.json({limit:1024102420, type:'application/json'}));
app.use(bodyParser.text());
app.use(cookieParser());


app.use('/', express.static(__dirname + '/public/', { 'index': 'index.html' }));


load('models')
    .then('controllers')
    .then('models')
    .then('util')
    .then('routes')
    .into(app);

 


 
app.listen(cfg.httpPort, cfg.httpHost, function () {
    console.info("########################################################################");
    console.info("##              POWER        SERVER STARTED              POWER        ##");
    console.info("########################################################################");
    console.info('Enviroment: ', cfg.env);
    console.info('URL: ', cfg.httpHost + ":" + cfg.httpPort);
    console.info("------------------------------------------------------------------------");
});

 