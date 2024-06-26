const router = require('express').Router();
const controller = require('./main.patient.controller');

router.route('/patient/main')
    .get(controller.getPatientMainPage);

router.route('/patient/diary')
    .get(controller.getPatientDiary)
    .post(controller.postPatientDiary);

router.route('/patient/history')
    .get(controller.getPatientHistory);

router.route('/patient/calendar')
    .get(controller.getPatientcalendar);

router.route('/patient/add')
    .get(controller.getPatientExplan)
    .post(controller.postPatientExplan);

router.route('/patient/calendar/info')
    .get(controller.getPatientCaledarPlan)


module.exports = router;