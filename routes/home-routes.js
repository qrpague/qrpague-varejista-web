module.exports = function(app) {
	var prototipo = app.controllers.prototipoController;

	app.post('getQRCode', prototipo.getQRCode);
	app.post('receiveMessage', prototipo.receiveMessage);
};
