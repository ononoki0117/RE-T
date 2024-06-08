// Configure MongoDB
let mydb;
const mongoClient = require('mongodb').MongoClient;
const mongoURL = process.env.DB_URL;

mongoClient
    .connect(mongoURL)
    .then(mongoClient => {
        console.log(`connection success : ${mongoURL}`);

        // Setting database
        mydb = mongoClient.db(process.env.DB_NAME);
    })
    .catch(err => {
        console.log(err);
    });

// Make Database Connection 
const connect = function () {
    return new Promise((resolve, reject) => {
        if (mydb) {
            resolve();
        }
        mongoClient.connect(mongoURL)
            .then(mongoClient => {
                console.log(`connection success : ${mongoURL}`);

                // Setting database
                mydb = mongoClient.db(process.env.DB_NAME);
                resolve();
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    })
}

const getDB = function () {
    return mydb;
}

module.exports = { getDB, connect };