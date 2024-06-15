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

const getPatientCallender = function (req, res) {
    res.render('./main/patient/main.patient.callender.ejs')
}

module.exports = { getPatientMainPage, getPatientDiary, getPatientHistory, getPatientCallender };