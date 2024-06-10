const connection = require('../database/database.connect');
const save = require('../database/database.save');

// 중복되는 ID가 있는지 검사하는 Promise
const validateID = function (result, retner_login_id) {
    return new Promise((resolve, reject) => {
        if (result.length > 0) {
            console.log(`retner_id ${retner_login_id} exist!`);
            reject("already exist"); // 그냥 값 넘길 수 있음! => 이유 써서 넘길것
        }
        else {
            console.log('validate successed!');
            resolve(result);
        }
    })
}

// 환자 객체 => model은 리트너 정보 객체
const retner = {
    model: {
        _id: null,
        retner_login_id: null,
        retner_password: null,
    },

    register: function () {
        const id = this.model.retner_login_id;
        // DB 조작 코드가 여기있는게 마음에 들지 않음... 
        return new Promise((resolve, reject) => {
            connection.connect().then(() => {
                const db = connection.getDB()

                db.collection('USER_RETNER')
                    .find({ retner_login_id: id })
                    .toArray()
                    .then((result) => {
                        console.log('find result ' + JSON.stringify(result))
                        return validateID(result, id);
                    })
                    .then((result) => {
                        console.log('validate' + JSON.stringify(result));
                        return save.save(db, this.model, 'USER_RETNER');
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

module.exports = { retner };