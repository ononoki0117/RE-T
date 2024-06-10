const USER = process.env.DB_USER;
const connection = require('../database/database.connect');

const findUserInformation = function (db, id, password) {
    return new Promise((resolve, reject) => {

        const db = connection.getDB();

        db.collection("USER")
            .findOne({ login_id: id })
            .then((result) => {
                console.log(result);
                if (result == null) {
                    resolve("no id");
                } else if (result.password == password) {
                    resolve(result);
                } else {
                    resolve("not match");
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    })
};

module.exports = { findUserInformation };