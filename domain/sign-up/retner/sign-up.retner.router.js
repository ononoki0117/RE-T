var router = require('express').Router();

const controller = require('./sign-up.retner.controller');

router
    .route('/sign-up/retner')
    .get(controller.redirectToStart);

router
    .route('/sign-up/retner/agree')
    .get(controller.startSignUp);

router
    .route('/sign-up/retner/verification')
    .get(controller.detectInvalidAccess)
    .post(controller.confirmAgreement);

router
    .route('/sign-up/retner/enter-information')
    .get(controller.detectInvalidAccess) // 테스트 용으로 잠시 바꿔 둠
    .post(controller.confirmVerification);

router
    .route('/sign-up/retner/complete')
    .get(controller.detectInvalidAccess)
    .post(controller.confirmPrivacyInformation);


module.exports = router;