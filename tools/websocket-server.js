'use strict';

let cfg = require( global.pathRootApp + '/tools/config')
let WebSocketServer = require('websocket').server
let http = require("http");

var server = http.createServer();

server.listen(cfg.WEBSOCKET_PORT);

var clients = [];

var wss = new WebSocketServer({
    httpServer: server
});

wss.on('open', function open() { });

wss.on('request', function (request) { 
    console.debug( request )
    var connection = request.accept(null, request.origin);
    connection.idTerminal = request.resourceURL.query.idTerminal

    clients.push(connection)

 
    connection.on('close', function () {
        for (var i = clients.length - 1; i >= 0; i--) {
            if (clients[i] === this) {
                clients.splice(i, 1);
            }
        }
    });
});



module.exports = {
    sendAll: function (message) {
        for (var i = 0; i < clients.length; i++) {
           clients[i].send(message);
        }
    },
    sendToClients: function (idTerminal, message) {

        let resposta = false ;
        
        for (var i = 0; i < clients.length; i++) {
            let client = clients[i]
            if ( client &&  client.idTerminal == idTerminal ) {
                client.send(message);
                resposta = true ;
            }
        }
        return resposta
    },
    sendToClient: function (idTerminal, message) {
        let client = clients.find ( c => { return c.idTerminal == idTerminal })
        if ( client ) {
            client.send(message);
            return true
        }
        return false;
    }
};
