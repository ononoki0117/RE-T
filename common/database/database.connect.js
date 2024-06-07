// Configure MongoDB
let mydb;
const mongoClient = require('mongodb').MongoClient;
const mongoURL = process.env.DB_URL;

// Make Database Connection 
const connect = mongoClient.connect(mongoURL).then(mongoClient => {
    console.log(`connection success : ${mongoURL}`);

    // Setting database
    mydb = mongoClient.db(process.env.DB_NAME);

}).catch(err => {
    console.log(err);
});

module.exports = { mydb, mongoClient, mongoURL, connect };