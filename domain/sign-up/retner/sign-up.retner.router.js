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

// 회원정보를 db에 넘긴 후 profile화면으로 넘어갈거임 
router
    .route('/sign-up/retner/profile')
    .get(controller.detectInvalidAccess)
    .post(controller.confirmPrivacyInformation);

router
    .route('/sign-up/retner/complete')
    .get(controller.detectInvalidAccess)
    .post(controller.confirmProfile);


module.exports = router;