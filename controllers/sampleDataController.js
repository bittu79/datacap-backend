const mongoose = require('mongoose');
const sampleDataServices = require('../services/sampleDataServices');

exports.getData = async (req, res) => {
    const data = await sampleDataServices.find()
    res.status(200).json({ status_code: 200, status: 'success', message: data});
}

exports.updateData = async (req, res) => {
    const data = await sampleDataServices.update()
    res.status(200).json({ status_code: 200, status: 'success', message: data});
}

exports.aggregatingData = async (req, res) => {
    const data = await sampleDataServices.aggregatingData()
    res.status(200).json({ status_code: 200, status: 'success', message: data});
}

exports.createData = async(req,res)=>{
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var inputData = req.body;
            let insertData = {
                ...inputData,
            };
            const data = await sampleDataServices.create(insertData);
            res.status(200).json({ status_code: 200, status: 'success', message: data});
        } catch (err) {
            res.status(500).json({ status_code: 500, status: 'failure', message: err.stack });
        }
    }
}

exports.deleteData = async(req,res)=>{
    req.assert('name', 'name cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var inputData = req.body;
            const data = await sampleDataServices.delete(inputData);
            res.status(200).json({ status_code: 200, status: 'success', message: data});
        } catch (err) {
            res.status(500).json({ status_code: 500, status: 'failure', message: err.stack });
        }
    }
}