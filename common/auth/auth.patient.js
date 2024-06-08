const connection = require('../database/database.connect');
const save = require('../database/database.save');

// 중복되는 ID가 있는지 검사하는 Promise
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

// 환자 객체 => model은 환자 정보 객체
const patient = {
    model: {
        _id: null,
        patient_login_id: null,
        patient_password: null,
        staff_id: null,
    },

    register: function () {
        const id = this.model.patient_login_id;
        // DB 조작 코드가 여기있는게 마음에 들지 않음... 
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
                        return save.save(db, this.model, 'USER_PATIENT');
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