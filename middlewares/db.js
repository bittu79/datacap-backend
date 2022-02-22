require('dotenv').config({ path: './variables.env' });
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let dbConnection;

const options = {
    //NEW CONFIGURATION
    // keepAlive: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 300000,
    // heartbeatFrequencyMS: 10000,
    // family: 4,
    // dbName: process.env.DB_NAME
    //OLD CONFIGURATION
    connectTimeoutMS: 200000,
    socketTimeoutMS: 2000000,
    keepAlive: true,
    useNewUrlParser: true,
    dbName: process.env.DB_NAME
  };

exports.connectToDatabase = async (req, res, next) => {
    if (dbConnection) {
        console.log('----DB----PREVIOUS-CONNECTION----------------');
        next()
    } else {
        mongoose.connect(process.env.DB_STRING, options)
        .then(db => {
          console.log('----DB----NEW-CONNECTION----------------');
          dbConnection = db.connections[0].readyState;
          console.log('----DB----NEW-CONNECTION-INIT----------------');
          next()
      },
      err => {
        console.log('----DB----ERROR-CONNECTION----------------');
        console.log(err);
        return res.send({
          status_code: 409,
          success: false,
          message: 'DB connection failure'
      });
        }
      );
    }
  };

exports.connectToDatabaseFromScheduler = async () => {
    try {
      if(dbConnection){
        console.log('----DB----PREVIOUS-CONNECTION----------------');
        return 'connected'
      } else {
        console.log('----DB----NEW-CONNECTION----------------');
        await mongoose.connect(process.env.DB_STRING, options);
        dbConnection = mongoose.connection;
        console.log('----DB----NEW-CONNECTION-INIT---------------');
        return 'connected'
      }
  } catch (err) {
    console.log('----DB----ERROR-CONNECTION----------------');
    console.log(err);
    return 'failed'
  }
}