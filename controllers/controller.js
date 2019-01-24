'use strict';

let Payments = require(global.pathRootApp + '/resources/payments');
let socket = require(global.pathRootApp + '/tools/websocket-server.js');

import Config from 'tools/config'

module.exports = {

	notification: async function (req, res, next) {
		try {
			let autorizacao = req.body
			if (!autorizacao) {
				return next('QRPAGUE_VAREJISTA_WEB_PARANS_IS_EMPTY')
			}
			let idTerminal = autorizacao.terminal.idTerminal
			let resposta = autorizacao.terminal
			
			resposta.status =  'CONFIRMADO'	
			resposta.dataHoraAutorizacao =  autorizacao.dataHoraAutorizacao 


			let notificado = await socket.sendToClients(idTerminal, resposta);
			resposta.notificado = notificado

			return res.send(resposta);

		} catch (error) {
			return next('QRPAGUE_VAREJISTA_WEB_RECEIVE-MESSAGE_ERROR_CATCH' + error)
		}
	},

	create: async function (req, res, next) {

		try {
			let operacao = req.body
			if (!operacao) {
				return next('QRPAGUE_VAREJISTA_WEB_QRCODE_PARAMS_EMPTY')
			}

			var data = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23);

			let newPayment = {
				versao: 1,
				cnpjInstituicao: "01234567890123",
				valor: operacao.valor,
				descricao: "Pagamento Loja McBurgues",
				dataHoraSolicitacao: new Date(),
				dataHoraVencimento: new Date(),
				dataHoraEfetivacao: new Date(),
				tipoOperacao: "PAGAMENTO",
				situacao: "ABERTO",
				callback: Config.URL_CALLBACK_PAY_NOTIFICATION,
				terminal : operacao.terminal,
				beneficiario: {},
				itens : operacao.itens

			}

			console.log( "NEWPAYMENT", newPayment )

			let resposta = await Payments.send(newPayment)
			if (!resposta) {
				return next('QRCODE_VAREJISTA_WEB_ERROR_RESPOSTA')
			}

			return res.status(200).send(resposta);
		} catch (error) {
			return next('QRPAGUE_VAREJISTA_WEB_ERROR_CATCH'+ error)
		}

	},

	detail: async function (req, res, next) {
		try {	
			let uuid = req.params.uuid
			let cnpjInstituicao = req.headers['cnpjInstituicao']

			if ( !uuid ) {
				return next('QRPAGUE_VAREJISTA_WEB_QRCODE_PARAMS_EMPTY')
			}
			if ( !cnpjInstituicao ) {
				return next('QRPAGUE_VAREJISTA_WEB_QRCODE_PARAMS_EMPTY')
			}

			let resposta = await Payments.detail(newPayment)
			if (!resposta) {
				next('QRCODE_VAREJISTA_WEB_ERROR_RESPOSTA')
			}

			return res.status(200).send(resposta);


		} catch (error) {

		}
	}
}


