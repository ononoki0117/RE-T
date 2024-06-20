const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const ISODate = require('isodate');
const connection = require('../../../common/database/database.connect');
const save = require('../../../common/database/database.save');

const getRetnerMainPage = function (req, res) {
    let query = {
        $and: [
            { kind: 'patient' },
            { staff_id: req.session.user.staff_id }
        ]
    }

    let patients;

    if (req.session.patients == null) {
        connection.connect()
            .then(() => {
                const db = connection.getDB();

                db.collection('USER')
                    .find(query)
                    .toArray()
                    .then((result) => {
                        patients = result;
                        console.log(patients);

                        req.session.patients = patients;

                        res.render('./main/retner/main.retner.ejs', {
                            data: {
                                date: currentDate,
                                user: req.session.user,
                                message: {
                                    today: 3,
                                    new_chat: 2,
                                },
                                patients: patients
                            }
                        });
                    })
            })
            .catch((err) => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write("<script>alert('서버에 문제가 생겼습니다, 다시 시도해 주세요');  history.go(-1);</script>");
            })
    }
    else {
        patients = req.session.patients;
        res.render('./main/retner/main.retner.ejs', {
            data: {
                date: currentDate,
                user: req.session.user,
                message: {
                    today: 3,
                    new_chat: 2,
                },
                login_id: req.session.user.login_id,
                patients: patients,
                code: req.session.user.staff_id,
            }
        });
    }


}

const getRetnerCallender = function (req, res) {
    const calendarControl = require('../../component/component.calendar.controller')

    const calendar = calendarControl.getMonthlycalendar(currentYear, currentMonth);

    calendar.forEach(week => {
        week.forEach(day => {
            if (day.day == currentDate.getDate()) {
                day.today = true;
            }

        });
    });

    res.render('./main/retner/main.retner.calendar.ejs', {
        data: {
            login_id: req.session.user.login_id, date: currentDate, calendar: calendar, code: req.session.user.staff_id,
        }, year: currentDate.getFullYear(), month: currentDate.getMonth() + 1
    });
}

const getRetnerChatList = function (req, res) {
    res.render('./main/retner/main.retner.chat.ejs', {
        data: {
            login_id: req.session.user.login_id, code: req.session.user.staff_id,
        }
    });
}

const getRetnerAddExercise = function (req, res) {
    res.render('./main/retner/main.retner.exercisePush.ejs', {
        data: {
            login_id: req.session.user.login_id, code: req.session.user.staff_id,
        }
    });
}

const getRetnerPatientList = function (req, res) {
    res.render('./main/retner/main.retner.memberList.ejs', {
        data: {
            login_id: req.session.user.login_id, code: req.session.user.staff_id,
        }
    });
}

const getRetnerEveryChatList = function (req, res) {
    res.render('./main/retner/main.retner.memberList.ejs', {
        data: {
            login_id: req.session.user.login_id, code: req.session.user.staff_id,
        }
    });
}

const getRetnerPatientInfo = function (req, res) {
    let id = req.query.id;
    let name = req.query.name;
    let hurt = req.query.hurt;

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    let exercises = null;

    const query = {
        patient_id: id,
        date: { $gte: startOfDay, $lte: endOfDay }
    };

    connection.connect()
        .then(() => {
            const db = connection.getDB();

            db.collection('EXPLAN')
                .find(query)
                .toArray()
                .then((result) => {
                    console.log(result);
                    exercises = result;




                    res.render('./main/retner/main.retner.exercisePush.ejs', {
                        data:
                        {
                            id: id,
                            name: name,
                            hurt: hurt,
                            date: currentDate,
                            exercises: exercises,
                            login_id: req.session.user.login_id,
                            code: req.session.user.staff_id,

                        }
                    });
                })
                .catch((err) => {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write("<script>alert('서버에 문제가 생겼습니다, 다시 시도해 주세요');  history.go(-1);</script>");
                })
        })
        .catch((err) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.write("<script>alert('서버에 문제가 생겼습니다, 다시 시도해 주세요');  history.go(-1);</script>");
        })
}

const getRetnerPatientExercise = function (req, res) {
    let id = req.query.id;
    let name = req.query.name;
    let hurt = req.query.hurt;

    res.render('./main/retner/main.retner.exerciseAdd.ejs', {
        data: {
            id: id,
            name: name,
            hurt: hurt
        }
    });
}

const postRetnerPatientExercise = function (req, res) {
    console.log(req.body);

    const caption = req.body.exercise_place + " " + req.body.exercise_count + " 회";

    exercise = {
        patient_id: req.query.id,
        date: currentDate,
        name: req.body.exercise_name,
        caption: caption,
        complete: false,
        link: req.body.exercise_explain
    }

    connection.connect()
        .then(() => {
            const db = connection.getDB();
            console.log(exercise);
            return save.save(db, exercise, 'EXPLAN');
        })
        .then((result) => {
            res.redirect(`/retner/patient?id=${req.query.id}&name=${req.query.name}&hurt=${req.query.hurt}`)
        })
        .catch((err) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.write("<script>alert('서버에 문제가 생겼습니다, 다시 시도해 주세요');  history.go(-1);</script>");
        })
}

module.exports = {
    getRetnerMainPage,
    getRetnerCallender,
    getRetnerChatList,
    getRetnerAddExercise,
    getRetnerPatientList,
    getRetnerEveryChatList,
    getRetnerPatientInfo,
    getRetnerPatientExercise,
    postRetnerPatientExercise
};