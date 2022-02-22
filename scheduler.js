require('dotenv').config({ path: './variables.env' });
const db = require('./middlewares/db');
const moment = require('moment');
const mongoose = require('mongoose');
const debug = require('./helpers/debugger');
const allFunctions = require('./helpers/functions');

module.exports.schedulerOne = async (event, context) => {
    try {
        let dbStatus = await db.connectToDatabaseFromScheduler();
        if(dbStatus == 'connected'){
            //SCHEDULER ONE
        }
        if(dbStatus != 'connected'){
            console.log('----SCHEDULER-----NOT-INITAILIZED------')
        }
    } catch(err) {
        console.log(`-----------schedulerOne-ERROR--------------------`)
        await debug.addRouteDebug({route_name: "schedulerOne", debug_details: err.stack });
    }
}

module.exports.schedulerTwo = async (event, context) => {
    try {
        let dbStatus = await db.connectToDatabaseFromScheduler();
        if(dbStatus == 'connected'){
            //SCHEDULER ONE
        }
        if(dbStatus != 'connected'){
            console.log('----SCHEDULER-----NOT-INITAILIZED------')
        }
    } catch(err) {
        console.log(`-----------schedulerTwo-ERROR--------------------`)
        await debug.addRouteDebug({route_name: "schedulerTwo", debug_details: err.stack });
    }
}