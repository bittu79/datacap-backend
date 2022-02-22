const mongoose = require('mongoose');
const User = require('../models/User');

exports.create = async (UserData) => {
    return await User.create(UserData);
}

exports.getTokenById = async (userId) => {
    return await User.findOne({ '_id': userId })
        .select('token_session')
        .lean();
}