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

wss.on('open', function open() {
    var txt = '';
});

wss.on('request', function (request) {
    var connection = request.accept(null, request.origin);

    clients.push(connection) - 1;

    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            sendAll(message.utf8Data);
        }
        else if (message.type === 'binary') {
            connection.sendBytes(message.binaryData);
        }
    });

    connection.on('close', function () {
        for (var i = clients.length - 1; i >= 0; i--) {
            if (clients[i] === this) {
                clients.splice(i, 1);
            }
        }
    });
});

function sendAll(message) {
    for (var i = 0; i < clients.length; i++) {
       clients[i].send(message);
    }
}

exports.sendAll = sendAll;
