var router = require('express').Router();

const controller = require('./sign-up.patient.controller');

let multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, done) {
        done(null, './public/img/profile')
    },
    filename: function (req, file, done) {
        done(null, file.originalname)
    }
})

let upload = multer({ storage: storage });

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
    .get(controller.detectInvalidAccess) // 테스트 용으로 잠시 바꿔 둠
    .post(controller.confirmVerification);

// 회원정보를 db에 넘긴 후 profile화면으로 넘어갈거임 
router
    .route('/sign-up/patient/complete')
    .get(controller.detectInvalidAccess)
    .post(controller.confirmPrivacyInformation);

router
    .route('/sign-up/patient/profile')
    .get(controller.detectInvalidAccess)
    .post(upload.single('picture'), controller.confirmProfile);


module.exports = router;