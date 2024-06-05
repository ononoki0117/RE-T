var router = require('express').Router();

router.get('/sign-up/patient/agree', function (req, res) {
    console.log('환자 약관 동의');

    res.render('./sign-up/patient/sign-up.patient.agree.ejs');
})

router.get('/sign-up/patient/verification', function (req, res) {
    console.log('환자 본인인증');

    res.render('./sign-up/patient/sign-up.patient.verification.ejs')
})

router.get('/sign-up/patient', function (req, res) {
    console.log('환자 아이디, 패스워드');

    res.render('./sign-up/patient/sign-up.patient.ejs');
})

router.post('/sign-up/paitent', function (req, res) {
    console.log('환자 정보 입력 完');


    res.render('./sign-up/patient/sign-up.patient.profile.ejs')
})
module.exports = router;