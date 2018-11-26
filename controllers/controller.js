'use strict';

let Payments = require(global.pathRootApp + '/resources/payments');
let socket = require(global.pathRootApp + '/tools/websocket-server.js');

module.exports = {

	notification: async function (req, res, next) {
		try {
			let autorizacao = req.body
			if (!autorizacao) {
				return next('QRPAGUE_VAREJISTA_WEB_PARANS_IS_EMPTY')
			}
			let idTerminal = autorizacao.dispositivoConfirmacao.idTerminal
			let resposta = { status: 'CONFIRMADO', dataHoraAutorizacao: autorizacao.dataHoraAutorizacao }


			let notificado = await socket.sendToClient(idTerminal, resposta);
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
				"versao": 1,
				"cnpjInstituicao": "01234567890123",
				"valor": operacao.valor,
				"descricao": "Pagamento Loja McBurgues",
				"dataHoraSolicitacao": new Date(),
				"dataHoraVencimento": new Date(),
				"dataHoraEfetivacao": new Date(),
				"tipoOperacao": "PAGAMENTO",
				"situacao": "ABERTO",
				"callback": "http://0.0.0.0:9093/receivemessage",
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
			if (!resposta) {
				next('QRCODE_VAREJISTA_WEB_ERROR_RESPOSTA')
			}

			return res.status(200).send(resposta);
		} catch (error) {
			return next('QRPAGUE_VAREJISTA_WEB_ERROR_CATCH', error)
		}

	},

	detail: async function (req, res, next) {
		try {	
			let uuid = req.params.uuid

		} catch (error) {

		}
	}
}


