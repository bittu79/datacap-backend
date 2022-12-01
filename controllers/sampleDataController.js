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