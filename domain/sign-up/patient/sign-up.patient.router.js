var router = require('express').Router();

const controller = require('./sign-up.patient.controller');

router
    .route('/sign-up/patient')
    .get(controller.redirectToStart);

router
    .route('/sign-up/patient/agree')
    .get(controller.startSignUp);

router
    .route('/sign-up/patient/verification')
    .get(controller.detectInvalidAccess)
    .post(controller.confirmAgreement);

router
    .route('/sign-up/patient/enter-information')
    .get(controller.detectInvalidAccess)
    .post(controller.confirmPrivacyInformation);

router
    .route('/sign-up/patient/profile')
    .get(controller.detectInvalidAccess)
    .post(controller.confirmProfile);

module.exports = router;