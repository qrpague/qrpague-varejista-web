

var Config = {
	PROTOCOL: 'http',
	PORT :  9093,
	HOST : '0.0.0.0',
	WEBSOCKET_PORT : 4000,
	GATEWAY_QRPAGUE_BACKEND : 'http://'+Config.HOST+':9092'
  
};

module.exports = Config;

