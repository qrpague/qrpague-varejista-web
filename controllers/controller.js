'use strict';

let  Payments = require(global.pathRootApp + '/resources/payments');
let  socket = require(global.pathRootApp + '/tools/websocket-server.js');

module.exports = {
	
	receiveMessage: function (req, res, next) {
		
		let autorizacao = req.body 
		if ( !autorizacao ) {
			return next( 'VAREJISTA_WEB_PARANS_IS_EMPTY' )
		}

		
		socket.sendAll('');
		

		res.send( resposta );
	},

	qrcode: async function (req, res, next) {

		try{
			let operacao = req.body	
			if ( !operacao ) {
				return next('QRPAGUE_VAREJISTA_WEB_QRCODE_PARAMS_EMPTY')
			}
	 
			var data = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23);
	
			let newPayment = {
				"versao": 1,
				"cnpjInstituicao": "01234567890123",
				"valor": operacao.valor,
				"descricao": "Pagamento Loja McBurgues",
				"dataHoraSolicitacao": new Date() ,
				"dataHoraVencimento": new Date() ,
				"dataHoraEfetivacao": new Date() ,
				"tipoOperacao": "PAGAMENTO",
				"situacao": "ABERTO",
				"terminal": {
				  "idTerminal": "0001128322332",
				  "descricao": "Terminal b9384 ",
				  "uf": "DF",
				  "cep": "70000-000",
				  "latitudeTerminal": "-15.7801",
				  "longitudeTerminal": "-47.9292"
				},
				"beneficiario": {}
			   
			  }
	
			let resposta = await Payments.send(newPayment)
			if ( !resposta ) {
				next( 'QRCODE_VAREJISTA_WEB_ERROR_RESPOSTA' )
			}
	
			return res.status(200).send( resposta );
		}catch( error ) {
			return next( 'QRPAGUE_VAREJISTA_WEB_ERROR_CATCH' , error )
		}
			 
	},
}


