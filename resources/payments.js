'use strict';

let config = require(global.pathRootApp + '/tools/config');
import HttpUtils from '/tools//http';

module.exports = {
    list : function (peer) {
        return new Promise((resolve, reject) => {

            let urlPath = config.URL_PAYMENT_REQUEST_LIST + "?peer=" + peer.id
            var req = {
                method: 'GET',
                url: urlPath,
                headers: {
                    'Authorization': config.HEADER_AUTHORIZATION_TEST
                },
            }
            $http(req)
                .then(function (result) {
                    if (result && result.data) {
                        resolve(result.data)
                    } else {
                        reject(result)
                    }
                })
                .catch(function (erro) {
                    console.log(erro);
                    reject(erro)
                });
        })
    },

    detail : function (paymentRequest) {
        return new Promise((resolve, reject) => {
            let urlPath = config.URL_PAYMENT_REQUEST_DETAIL + "?id=" + paymentRequest.id
            var req = {
                method: 'GET',
                url: urlPath,
                headers: {
                    'Authorization': config.HEADER_AUTHORIZATION_TEST
                },
                data: telefones
            }

            $http(req)
                .then(function (result) {
                    if (result && result.data) {
                        resolve(result.data)
                    } else {
                        reject(result)
                    }
                })

                .catch(function (erro) {
                    console.log(erro);
                    reject(erro)
                });
        })
    },

    send : async function (payment) {

 
        let urlPath = config.GATEWAY_QRPAGUE_BACKEND + '/operacao'
        let options = {
            method: 'POST',
            uri: urlPath,
            body: payment,
            headers:{
                'Content-Type': 'application/json' 
            },
            json: true
            
         };
         console.log( options )
        
        return HttpUtils.request(options) 
    },

    token : function (paymentRequest) {

        return new Promise((resolve, reject) => {
            let urlPath = config.URL_PAYMENT_REQUEST_ADD
            var options = {
                "method": "GET",
                "hostname": '10.222.18.103',
                "port": '12001',
                "path": "/payment-requests" + "/" + paymentRequest.id + "/token",
                "headers": {
                    "content-type": "application/json",
                    'Authorization': config.HEADER_AUTHORIZATION_TEST
                }
            };

            var req = http.request(options, function (res) {
                var chunks = [];

                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                res.on("end", function () {
                    var body = JSON.parse(Buffer.concat(chunks).toString());
                    resolve(body)
                });
                res.on("error", function (err) { reject(err) });
            });
            req.end();
        });
    },

    update : function (payment) {

        return new Promise((resolve, reject) => {


            let urlPath = config.URL_PAYMENT_REQUEST_UPDATE
            var req = {
                method: 'POST',
                url: urlPath,
                headers: {
                    'Authorization': config.HEADER_AUTHORIZATION_TEST
                },
                data: payment
            }

            $http(req)

                .then(function (result) {
                    if (result && result.data) {
                        resolve(result.data)
                    } else {
                        reject(result)
                    }
                })

                .catch(function (erro) {
                    console.log(erro);
                    reject(erro)
                });
        })

    },

    cancel : function (payment) {
    }
}


