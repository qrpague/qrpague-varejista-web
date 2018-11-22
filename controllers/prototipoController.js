'use strict';

var Promise = require('promise');
var https = require('https');
var HttpPaymentRequest = require('../util/HttpPaymentRequest');
var socket = require('../socketUtil.js');

module.exports = function (app) {
	var protipo = {
		///////////////////////////////////////////////////////////////////////
		// verifyCar
		// Metod
		///////////////////////////////////////////////////////////////////////
		receiveMessage: function (req, res) {
			socket.sendAll('');
			res.send('Message received and sended to client');
		},


		///////////////////////////////////////////////////////////////////////
		// verifyCar
		// Metod
		///////////////////////////////////////////////////////////////////////
		getQRCode: function (req, res) {

			var localPreferences = { "branch-number": "1", "account-number": "19" };

			var data = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23);
			
             let newPayment = {

                "label": 'Hamburgeria',
                "asset": "BRL",
                "amount": req.body.valor,
                "receivingPeerId": '03202165518',
                "localProvisionTarget": JSON.stringify(localPreferences) ,
                "expirationTimestamp": data,
				"callbackURL":"/sfb/receiveMessage"
            }

            HttpPaymentRequest.send( newPayment )
			.then( result => {
				res.send(result)
            })
			.catch ( erro => {
                PopUp.show( $rootScope ,"Aviso" , erro )
            })
		},
	}

	return protipo;
}

