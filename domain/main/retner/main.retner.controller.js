const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const connection = require('../../../common/database/database.connect');

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
                patients: patients
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

    res.render('./main/retner/main.retner.calendar.ejs', { data: { date: currentDate, calendar: calendar } });
}

const getRetnerChatList = function (req, res) {
    res.render('./main/retner/main.retner.chat.ejs');
}

const getRetnerAddExercise = function (req, res) {
    res.render('./main/retner/main.retner.exercisePush.ejs');
}

const getRetnerPatientList = function (req, res) {
    res.render('./main/retner/main.retner.memberList.ejs');
}

const getRetnerEveryChatList = function (req, res) {
    res.render('./main/retner/main.retner.memberList.ejs');
}

const getRetnerPatientInfo = function (req, res) {
    res.render('./main/retner/main.retner.exercisePush.ejs');
}

const getRetnerPateintEnter = function (req, res) {
    res.render('./main/retner/main.retner.exerciseAdd.ejs')
}

module.exports = { getRetnerMainPage, getRetnerCallender, getRetnerChatList, getRetnerAddExercise, getRetnerPatientList, getRetnerEveryChatList, getRetnerPatientInfo, getRetnerPateintEnter };