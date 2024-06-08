const USER_PATIENT = process.env.DB_USER_PATIENT;
const USER_STAFF = process.env.DB_USER_STAFF;
const connection = require('../database/database.connect');

const findUserInformation = function (db, id, password) {
    return new Promise((resolve, reject) => {

        const db = connection.getDB();

        db.collection(USER_PATIENT)
            .findOne({ patient_login_id: id })
            .then((result) => {
                console.log(result);
                if (result == null) {
                    resolve("no id");
                } else if (result.patient_password == password) {
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

const findRetnerInformation = function (db, id, password) {
    return new Promise((resolve, reject) => {

        const db = connection.getDB();

        db.collection(USER_STAFF)
            .findOne({ staff_login_id: id })
            .then((result) => {
                console.log(result);

                if (result.staff_password == password) {
                    resolve(result);
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    })
};

module.exports = { findUserInformation, findRetnerInformation };