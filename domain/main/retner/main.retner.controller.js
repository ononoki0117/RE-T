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

    connection.connect()
        .then(() => {
            const db = connection.getDB();

            db.collection('USER')
                .find(query)
                .toArray()
                .then((result) => {
                    patients = result;
                    console.log(patients);

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

module.exports = { getRetnerMainPage };