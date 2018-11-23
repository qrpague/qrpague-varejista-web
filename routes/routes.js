let express = require('express')
let Controller = require( global.pathRootApp + '/controllers/controller')


const router = express.Router();


router.route('/qrcode').post(Controller.qrcode); 
router.route('/receivemessage').get(Controller.receiveMessage); 

module.exports = router;
