const connection = require('../database/database.connect');
const save = require('../database/database.save');

// 중복되는 ID가 있는지 검사하는 Promise
const validateLoginID = function (login_id) {
    return new Promise((resolve, reject) => {
        connection.connect()
            .then(() => {
                const db = connection.getDB();

                db.collection('USER')
                    .find({ login_id: login_id })
                    .toArray()
                    .then((result) => {
                        if (result.length > 0) {
                            console.log(`login_id ${login_id} exist!`);
                            reject("이미 존재하는 ID 입니다!");
                        }
                        else {
                            console.log(`login_id ${login_id} dose not exist!`);
                            console.log('id validate succeed!');
                            resolve(result);
                        }
                    })
                    .catch((err) => {
                        console.log("database err! " + JSON.stringify(err));
                        reject("서버에 문제가 생겼습니다. 다시 시도해 주세요.");
                    })
            })
            .catch(() => {
                console.log('database does not connected!' + err);
                reject("서버에 문제가 생겼습니다. 다시 시도해 주세요.");
            })
    })
}

const validateStaffID = function (staff_id) {
    return new Promise((resolve, reject) => {
        connection.connect()
            .then(() => {
                const db = connection.getDB();

                db.collection('USER')
                    .find({ $and: [{ staff_id: staff_id }, { kind: 'retner' }] })
                    .toArray()
                    .then((result) => {
                        console.log(result);

                        if (result.length > 0) {
                            console.log(`staff id ${staff_id} exist!`);
                            resolve();
                        }
                        else {
                            console.log(`staff id ${staff_id} not found!`);
                            reject("존재하지 않는 리트너 코드입니다!");
                        }
                    })
                    .catch((err) => {
                        console.log(`find Err ${err}`);
                        reject("서버에 문제가 생겼습니다. 다시 시도해 주세요.");
                    })
            })
            .catch((err) => {
                console.log(`database err ${err}`);
                reject("서버에 문제가 생겼습니다. 다시 시도해 주세요.");
            })
    })
}

// 환자 객체 => model은 환자 정보 객체
const user = {
    model: {
        _id: null,
        login_id: null,
        password: null,
        kind: null,
        staff_id: null,
        profile: {
            picture: null,
            nickname: null,
            hurt: null,
            organization: null,
        },
    },

    // 아이디가 있는지 확인
    // kind == 'patient' 라면 retner코드도 확인
    register: function () {
        return new Promise((resolve, reject) => {
            validateLoginID(this.model.login_id)
                .then((result) => {
                    if (this.model.kind == 'patient') {
                        return validateStaffID(this.model.staff_id);
                    }
                })
                .then(() => {
                    const db = connection.getDB();
                    return save.save(db, this.model, 'USER');
                })
                .catch((err) => {
                    console.log("validate err! " + (err));
                    reject(err);
                })
                .then((result) => {
                    console.log('finished: ' + JSON.stringify(result));
                    resolve(result);
                })
        })
    },

    // 프로파일 설정 
    setProfile: function () {
        var query = { login_id: this.model.login_id };
        var operator = { profile: this.model.profile };

        return new Promise((resolve, reject) => {
            connection.connect().then(() => {
                const db = connection.getDB();

                db.collection('USER')
                    .updateOne(query, { $set: operator })
                    .then((result) => {
                        console.log('업데이트 성공' + result);
                        resolve();
                    })
                    .catch((err) => {
                        console.log('업데이트 실패 ' + err);
                        reject();
                    })
            })
        })
    }
}

module.exports = { user };