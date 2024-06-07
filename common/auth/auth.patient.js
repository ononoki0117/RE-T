const connection = require('../database/database.connect');

const validateID = function (result, patient_login_id) {
    return new Promise((resolve, reject) => {
        if (result.length > 0) {
            console.log(`patient_id ${patient_login_id} exist!`);
            reject("already exist"); // 그냥 값 넘길 수 있음! => 이유 써서 넘길것
        }
        else {
            console.log('validate successed!');
            resolve(result);
        }
    })
}

const save2DB = function (db, model) {
    return new Promise((resolve, reject) => {
        const id = model.patient_login_id;
        const password = model.patient_password;
        const staff_id = model.staff_id;

        db.collection('USER_PATIENT')
            .insertOne({
                patient_login_id: id,
                patient_password: password,
                staff_id: staff_id
            })
            .then((result) => {
                console.log(result);
                console.log('회원가입 성공');
                resolve(result);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    })
}

const patient = {
    model: {
        _id: null,
        patient_login_id: null,
        patient_password: null,
        staff_id: null,
    },

    register: function () {
        const id = this.model.patient_login_id;
        const password = this.model.patient_password;
        const staff_id = this.model.staff_id;

        return new Promise((resolve, reject) => {
            connection.connect().then(() => {
                const db = connection.getDB()

                db.collection('USER_PATIENT')
                    .find({ patient_login_id: id })
                    .toArray()
                    .then((result) => {
                        console.log('find result ' + JSON.stringify(result))
                        return validateID(result, id);
                    })
                    .then((result) => {
                        console.log('validate' + JSON.stringify(result));
                        return save2DB(db, this.model);
                    })
                    .catch((err) => {
                        console.log("validate err! " + JSON.stringify(err));
                        reject(err);
                    }) // 중간에 리트너 id 값 찾는것도 있어야 함
                    .then((result) => {
                        console.log('finished: ' + JSON.stringify(result));
                        resolve(result);
                    })
            })
        })
    },
}

module.exports = { patient };