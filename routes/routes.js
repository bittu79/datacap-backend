const express = require('express');
var app = express();
const router = express.Router();

//Middlewares & Controllers
const auth = require('../middlewares/auth');
const adminController = require('../controllers/adminController');
const sampleDataController = require("../controllers/sampleDataController")

//Token auth
router.use(auth.authenticateSession);

//User related api's
// app.use('/app/sendOtp', userController.sendOtp);

//Admin related api's

app.use('/today',adminController.hello)

app.use('/admin/createAdmin', adminController.createAdmin);
app.use('/admin/login', adminController.adminLogin);
router.use('/admin/getSignedFileUrl', adminController.getSignedFileUrl);

app.use('/getData',sampleDataController.getData)
app.use('/updateData',sampleDataController.updateData)
app.use('/aggregatingData',sampleDataController.aggregatingData)
app.use('/create',sampleDataController.createData)
app.use('/delete',sampleDataController.deleteData)
app.use('', router);
module.exports = app;

