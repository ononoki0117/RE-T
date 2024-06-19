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

router.route('/retner/patient/list')
    .get(controller.getRetnerPatientList);

router.route('/retner/chats/list')
    .get(controller.getRetnerEveryChatList);

router.route('/retner/patient')
    .get(controller.getRetnerPatientInfo)

router.route('/retner/patient/add')
    .get(controller.getRetnerPatientExercise)
    .post(controller.postRetnerPatientExercise);
module.exports = router;