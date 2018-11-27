

var Config = {
	PROTOCOL: 'http',
	PORT :  9093,
	HOST : '0.0.0.0',
	WEBSOCKET_PORT : 4000,
	GATEWAY_QRPAGUE_BACKEND : 'http://0.0.0.0:9092',

	URL_CALLBACK_PAY_NOTIFICATION: "http://0.0.0.0:9093/loja/qrcode/notification"
  
};

module.exports = Config;

