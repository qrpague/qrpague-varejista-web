module.exports = function(app) {
	var prototipo = app.controllers.prototipoController;

	app.post('/sfd/getQRCode', prototipo.getQRCode);
	app.post('/sfd/receiveMessage', prototipo.receiveMessage);
};
