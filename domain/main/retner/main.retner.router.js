const router = require('express').Router();
const controller = require('./main.retner.controller');

router.route('/retner/main')
    .get(controller.getRetnerMainPage);

router.route('/retner/diary')
    .get(controller.getRetnerDiary);

router.route('/retner/history')
    .get(controller.getRetnerHistory);

router.route('/retner/calendar')
    .get(controller.getRetnercalendar);

module.exports = router;