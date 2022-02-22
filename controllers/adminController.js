require('dotenv').config({ path: './variables.env' });
const crypto = require('../helpers/crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const adminService = require('../services/adminService');
const allFunctions = require('../helpers/functions');
const debug = require('../helpers/debugger');
const fileUploads = require('../helpers/fileUpload');

exports.createAdmin = async (req, res) => {
    req.assert('name', 'name cannot be empty.').notEmpty();
    req.assert('email', 'email cannot be empty.').notEmpty();
    req.assert('mobile_number', 'mobile_number cannot be empty.').notEmpty();
    req.assert('admin_type', 'admin_type cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var inputData = req.body;
            console.log('---------Admin-create-----------');
            let password = await allFunctions.generatePassword(10);
            let encryptedPassword = crypto.encrypt(password);
            let createData = {
                ...inputData,
                password: encryptedPassword
            };
            let activeAdmin = await adminService.findByEmail(inputData.email);
            if (activeAdmin) {
                res.status(200).json({ status_code: 405, status: 'failure', message: 'admin with email already exists' });
            } else {
                let admin_details = await adminService.createAdmin(createData);
                res.status(200).json({ status_code: 200, status: 'success', message: 'admin added', test_password: password });
            }
        } catch (err) {
            await debug.addRouteDebug({route_name: "createAdmin", debug_details: err.stack });
            res.status(500).json({ status_code: 500, status: 'failure', message: err.stack });
        }
    }
}

exports.adminLogin = async (req, res) => {
    req.assert('email', 'email cannot be empty.').notEmpty();
    req.assert('password', 'password cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var inputData = req.body;
            console.log('---------Admin-login-----------');
            let admin = await adminService.findAdminByEmailForLogin(inputData.email);
            if(admin != null){
                if(crypto.decrypt(admin.password) == inputData.password){
                    let token_session = jwt.sign({ admin_id: admin._id, permissions :{admin_type: "super", read: true, edit: true, delete: true} }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME });
                    await adminService.updateAdminLoginDetails(admin._id, token_session);
                    let admin_details = await adminService.getAdminProfileDetailsForLogin(admin._id);
                    res.status(200).json({ status_code: 200, status: 'success', message: 'all admin details', token_session: token_session,  admin_details: admin_details });
                } else {
                    res.status(200).json({ status_code: 405, status: 'failure', message: 'invalid credentials' });
                }
            } else {
                res.status(200).json({ status_code: 405, status: 'failure', message: 'admin not found' });
            }
        } catch (err) {
            await debug.addRouteDebug({route_name: "adminLogin", debug_details: err.stack });
            res.status(500).json({ status_code: 500, status: 'failure', message: err.stack });
        }
    }
}

exports.getSignedFileUrl = async (req, res) => {
    req.assert('file_name', 'file_name cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var inputData = req.body;
            let uploadedDetails = await fileUploads.generatePublicS3FileUrl(inputData.file_name);
            if (uploadedDetails.status == 'Success') {
                res.status(200).json({ status_code: 200, status: 'success', message: 'Signed Details', details: uploadedDetails.data });
            } else {
                res.status(200).json({ status_code: 405, status: 'failure', message: 'Signing failed', details: uploadedDetails.data});
            }
        } catch (err) {
            await debug.addRouteDebug({route_name: "getSignedFileUrl", debug_details: err.stack });
            res.status(500).json({ status_code: 500, status: 'failure', message: err.stack });
        }
    }
}