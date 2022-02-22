const express = require('express');
var app = express();
const router = express.Router();

//Middlewares & Controllers
const auth = require('../middlewares/auth');
const adminController = require('../controllers/adminController');

//Token auth
router.use(auth.authenticateSession);

//User related api's
// app.use('/app/sendOtp', userController.sendOtp);

//Admin related api's
app.use('/admin/createAdmin', adminController.createAdmin);
app.use('/admin/login', adminController.adminLogin);
router.use('/admin/getSignedFileUrl', adminController.getSignedFileUrl);

app.use('', router);
module.exports = app;

