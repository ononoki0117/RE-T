var router = require('express').Router();

router.use(require('./patient/sign-up.patient.js'))
router.use(require('./re-tner/sign-up.re-tner.js'))

router.get('/sign-up/select', function (req, res) {
    console.log('회원종류 선택 페이지');

    res.render('./sign-up/sign-up.select.ejs');
})

module.exports = router;