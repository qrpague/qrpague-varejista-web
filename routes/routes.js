let express = require('express')
let QrcodeController = require( global.pathRootApp + '/controllers/controller')


const router = express.Router();


router.route('/qrcode').post(QrcodeController.create); 
router.route('/qrcode:uuid').get(QrcodeController.detail); 
router.route('/qrcode/notification').post(QrcodeController.notification); 

module.exports = router;
