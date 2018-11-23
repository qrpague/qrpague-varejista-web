 
var development = {
	env : global.process.env.NODE_ENV || 'development',
	httpPort : process.env.PORT || 8080,
	httpHost : '127.0.0.1',
	portWebsocket : 4000,
};


var production = {
	env : global.process.env.NODE_ENV || 'production',
	httpPort : process.env.PORT || 8080,
	httpHost : '127.0.0.1',
	portWebsocket : 4000,
 
};

exports.Config = global.process.env.NODE_ENV === 'production' ? production : development;
