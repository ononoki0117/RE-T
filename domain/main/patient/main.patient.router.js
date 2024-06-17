const router = require('express').Router();
const controller = require('./main.patient.controller');

router.route('/patient/main')
    .get(controller.getPatientMainPage);

router.route('/patient/diary')
    .get(controller.getPatientDiary);

router.route('/patient/history')
    .get(controller.getPatientHistory);

router.route('/patient/calendar')
    .get(controller.getPatientcalendar);

module.exports = router;