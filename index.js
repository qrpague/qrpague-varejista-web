'use strict';
let path = require('path');
global.pathRootApp = path.resolve(__dirname);


let express = require('express')
let load = require('express-load')
let app = express()
let bodyParser = require('body-parser')
let methodOverride = require('method-override')
let cookieParser = require('cookie-parser')
let cfg = require('./tools/config')
let Security = require('./tools/security');
let ResourcesNegocio = require('./routes/routes');
require('./tools/websocket-server')




global.env = cfg.env;
global.cfg = cfg;


app.use(Security.cors)
app.use(methodOverride());
app.use(bodyParser.json({limit:1024102420, type:'application/json'}));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(logErrors);
app.use(errorHandler);

app.use('/lanchonete', express.static(__dirname + '/public/', { 'index': 'index.html' }));


app.use('/lanchonete', ResourcesNegocio );

 
app.listen(cfg.PORT, cfg.HOST, function () {
    console.info("########################################################################");
    console.info("##              POWER        SERVER STARTED              POWER        ##");
    console.info("########################################################################");
    console.info('URL: ', cfg.HOST + ":" + cfg.PORT);
    console.info('WEBSOCKET: ', cfg.HOST + ":" + cfg.WEBSOCKET_PORT);
    console.info("------------------------------------------------------------------------");
});



function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
  }
  
  function errorHandler(err, req, res, next) {
    var status = err.status || 500;
    res.status(status).send( err );
  }
  
 