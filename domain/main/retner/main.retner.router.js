const router = require('express').Router();
const controller = require('./main.retner.controller');

router.route('/retner/main')
    .get(controller.getRetnerMainPage);

router.route('/retner/chats')
    .get(controller.getRetnerChatList);

router.route('/retner/calendar')
    .get(controller.getRetnerCallender);

router.route('/retner/exercisePush')
    .get(controller.getRetnerAddExercise);

module.exports = router;