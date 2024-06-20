const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const connection = require('../../../common/database/database.connect');
const save = require('../../../common/database/database.save');
const ObjectId = require('mongodb').ObjectId;

const getPatientMainPage = function (req, res) {
    let dayafter = 0;

    if (req.query.day != null) {
        dayafter = Number(req.query.day);
    }
    console.log(dayafter);

    const id = req.session.user.login_id;

    const today = new Date();

    const targetday = new Date(today);

    targetday.setDate(today.getDate() + dayafter);

    const startOfDay = new Date(targetday.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetday.setHours(23, 59, 59, 999));

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

                    req.session.exercises = exercises;

                    let i = 0;
                    exercises.forEach(exercise => {
                        if (exercise.complete) i++;
                    });

                    let progress = i / exercises.length * 100;
                    if (exercises.length == 0) {
                        progress = 0;
                    }

                    req.session.progress = progress;

                    res.render('./main/patient/main.patient.ejs', {
                        data:
                        {
                            progress: progress,
                            day: dayafter,
                            exercises: exercises
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

const getPatientDiary = function (req, res) {
    // if (req.session.exercises && req.session.diary) {
    //     res.render('./main/patient/main.patient.diary.ejs', {
    //         data:
    //         {
    //             diary: req.session.diary,
    //             progress: req.session.progress,
    //             exercises: req.session.exercises
    //         }
    //     })
    // }
    // else {
    const id = req.session.user.login_id;

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    let exercises = null;
    let diary = null;

    const explainquery = {
        patient_id: id,
        date: { $gte: startOfDay, $lte: endOfDay }
    };

    const diaryquery = {
        patient_id: id,
        date: { $gte: startOfDay, $lte: endOfDay }
    };

    console.log(startOfDay);
    console.log(endOfDay);

    connection.connect()
        .then(() => {
            const db = connection.getDB();

            db.collection('EXPLAN')
                .find(explainquery)
                .toArray()
                .then((result) => {
                    console.log(result);
                    exercises = result;
                    req.session.exercises = exercises;

                    db.collection('DIARY')
                        .findOne(diaryquery)
                        .then((result) => {
                            console.log('diaryq ' + diaryquery + "  " + result);
                            diary = result;
                            let i = 0;
                            exercises.forEach(exercise => {
                                if (exercise.complete) i++;
                            });

                            const progress = i / exercises.length * 100;
                            req.session.progress = progress;
                            req.session.diary = diary;
                            res.render('./main/patient/main.patient.diary.ejs', {
                                data:
                                {
                                    progress: progress,
                                    date: today,
                                    exercises: exercises,
                                    diary: diary
                                }
                            });
                        })
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
    // }
}

const postPatientDiary = function (req, res) {
    console.log(req.body);

    const on = req.body.on;
    let onmapped = null;

    if (on != null) {
        onmapped = on.map(id => new ObjectId(id));
    }

    const off = req.body.off;
    let offmapped = null;

    if (off != null) {
        offmapped = off.map(id => new ObjectId(id));
    }

    const diary = {
        patient_id: req.session.user.login_id,
        date: new Date(),
        diary: req.body.diary,
        hurt: req.body.hurt
    }

    connection.connect()
        .then(() => {
            const db = connection.getDB();

            if (on != null) {
                db.collection('EXPLAN')
                    .updateMany(
                        { _id: { $in: onmapped } },
                        { $set: { complete: true } }
                    )

                    .then((result) => {
                        console.log(result);
                    })
                    .catch((err) => {
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<script>alert('서버에 문제가 생겼습니다, 다시 시도해 주세요');  history.go(-1);</script>");
                    })
            }

            if (off != null) {
                db.collection('EXPLAN')
                    .updateMany(
                        { _id: { $in: offmapped } },
                        { $set: { complete: false } }
                    ).then((result) => {
                        console.log(result);
                    })
                    .catch((err) => {
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                        res.write("<script>alert('서버에 문제가 생겼습니다, 다시 시도해 주세요');  history.go(-1);</script>");
                    })
            }

            if (req.session.diary != null) {
                diary._id = req.session.diary._id;
                diary.date = req.session.diary.date;
            }
            db.collection('DIARY')
                .updateOne(
                    { _id: new ObjectId(diary._id) },
                    { $set: { diary: req.body.diary, hurt: req.body.hurt, date: diary.date, patient_id: diary.patient_id } },
                    { upsert: true }
                )
                //save.save(db, diary, 'DIARY')
                .then((result) => {
                    req.session.diary = diary;
                    console.log(result);
                    res.redirect('/patient/main');
                })
                .catch((err) => {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write("<script>alert('서버에 문제가 생겼습니다, 다시 시도해 주세요');  history.go(-1);</script>");
                })
                .catch((err) => {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write("<script>alert('서버에 문제가 생겼습니다, 다시 시도해 주세요');  history.go(-1);</script>");
                })
        })
}

const getPatientHistory = function (req, res) {
    const code = req.session.user.staff_id;

    connection.connect()
        .then(() => {
            const db = connection.getDB();

            db.collection('USER')
                .findOne({ $and: [{ staff_id: code }, { kind: 'retner' }] })
                .then((result) => {
                    console.log(result);

                    res.render('./main/patient/main.patient.history.ejs', {
                        data: {
                            progress: req.session.progress,
                            retner: result.login_id,
                            organization: result.profile.organization
                        }
                    })
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

const getPatientcalendar = function (req, res) {
    const calendarControl = require('../../component/component.calendar.controller')

    const calendar = calendarControl.getMonthlycalendar(currentYear, currentMonth);

    calendar.forEach(week => {
        week.forEach(day => {
            if (day.day == currentDate.getDate()) {
                day.today = true;
            }

        });
    });

    const name = req.session.user.profile.nickname;

    console.log(calendar);

    res.render('./main/patient/main.patient.calendar.ejs', { calendar, name, day: null, year: currentDate.getFullYear(), month: currentDate.getMonth() + 1 });
}

const getPatientExplan = function (req, res) {
    res.render('./main/patient/main.patient.add.ejs', { day: req.query.day });
}

const postPatientExplan = function (req, res) {
    console.log(req.body);

    const day = Number(req.query.day);

    const caption = req.body.exercise_place + " " + req.body.exercise_count + " 회";

    var targetday = new Date();

    targetday.setDate(currentDate.getDate() + day);

    exercise = {
        patient_id: req.session.user.login_id,
        date: targetday,
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
            res.redirect(`/patient/main?day=${day}`)
        })
        .catch((err) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.write("<script>alert('서버에 문제가 생겼습니다, 다시 시도해 주세요');  history.go(-1);</script>");
        })
}

const getPatientCaledarPlan = function (req, res) {
    const year = Number(req.query.year);
    const month = Number(req.query.month) - 1
    const date = Number(req.query.date);

    const target = new Date(year, month, date);

    console.log(target);

    const startOfDay = new Date(target.setHours(0, 0, 0, 0));
    const endOfDay = new Date(target.setHours(23, 59, 59, 999));

    const id = req.session.user.login_id;

    const explainquery = {
        patient_id: id,
        date: { $gte: startOfDay, $lte: endOfDay }
    };

    const diaryquery = {
        patient_id: id,
        date: { $gte: startOfDay, $lte: endOfDay }
    };



    connection.connect()
        .then(() => {
            const db = connection.getDB();

            db.collection('EXPLAN')
                .find(explainquery)
                .toArray()
                .then((result) => {
                    console.log(result);
                    exercises = result;
                    req.session.exercises = exercises;

                    db.collection('DIARY')
                        .findOne(diaryquery)
                        .then((result) => {
                            console.log(result);
                            diary = result;
                            let i = 0;
                            exercises.forEach(exercise => {
                                if (exercise.complete) i++;
                            });

                            const progress = i / exercises.length * 100;
                            req.session.progress = progress;
                            req.session.diary = diary;
                            res.render('./main/patient/main.patient.calendar.info.ejs', {
                                data:
                                {
                                    progress: progress,
                                    date: target,
                                    exercises: exercises,
                                    diary: diary
                                }
                            });
                        })
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



module.exports = { getPatientMainPage, getPatientDiary, getPatientHistory, getPatientcalendar, postPatientDiary, getPatientExplan, postPatientExplan, getPatientCaledarPlan };