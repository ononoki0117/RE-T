const getPatientMainPage = function (req, res) {
    res.render('./main/patient/main.patient.ejs', {
        data:
        {
            date: { string: "September 4" },
            progress: 35,
            exercises: [
                {
                    name: '튜빙운동 10회',
                    caption: '발목 근육 강화 운동',
                    complete: true,
                    id: 'tubing',
                },
                {
                    name: '튜빙운동 10회',
                    caption: '발목 근육 강화 운동',
                    complete: false,
                    id: 'tubing',
                }]
        }
    })
}

const getPatientDiary = function (req, res) {
    res.render('./main/patient/main.patient.diary.ejs', {
        data:
        {
            date: { string: "September 4" },
            progress: 35,
            exercises: [
                {
                    name: '튜빙운동 10회',
                    caption: '발목 근육 강화 운동',
                    complete: true,
                    id: 'tubing',
                },
                {
                    name: '튜빙운동 10회',
                    caption: '발목 근육 강화 운동',
                    complete: false,
                    id: 'tubing',
                }]
        }
    })
}

const getPatientHistory = function (req, res) {
    res.render('./main/patient/main.patient.history.ejs', {
        data:
        {
            date: { string: "September 4" },
            progress: 35,
            exercises: [
                {
                    name: '튜빙운동 10회',
                    caption: '발목 근육 강화 운동',
                    complete: true,
                    id: 'tubing',
                },
                {
                    name: '튜빙운동 10회',
                    caption: '발목 근육 강화 운동',
                    complete: false,
                    id: 'tubing',
                }]
        }
    })
}

const getPatientcalendar = function (req, res) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const calendarControl = require('../../component/component.calendar.controller')

    const calendar = calendarControl.getMonthlycalendar(currentYear, currentMonth);

    calendar.forEach(week => {
        week.forEach(day => {
            if (day.day == currentDate.getDate()) {
                day.today = true;
            }

        });
    });

    console.log(calendar);

    res.render('./main/patient/main.patient.calendar.ejs', { calendar });
}

module.exports = { getPatientMainPage, getPatientDiary, getPatientHistory, getPatientcalendar };