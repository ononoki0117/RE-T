var router = require('express').Router();

router.get('/sign-up/re-tner/agree', function (req, res) {
    console.log('리트너 약관 동의');

    res.render('./sign-up/re-tner/sign-up.re-tner.agree.ejs');
})

router.get('/sign-up/re-tner/verification', function (req, res) {
    console.log('리트너 본인인증');

    res.render('./sign-up/re-tner/sign-up.re-tner.verification.ejs')
})

router.get('/sign-up/patient', function (req, res) {
    console.log('환자 아이디, 패스워드');

    res.render('./sign-up/re-tner/sign-up.re-tner.ejs');
})

router.post('/sign-up/paitent', function (req, res) {
    console.log('리트너 정보 입력 完');


    res.render('./sign-up/re-tner/sign-up.re-tner.profile.ejs')
})
module.exports = router;