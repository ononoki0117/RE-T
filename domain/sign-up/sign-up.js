var router = require('express').Router();

router.get('/sign-up/select', function (req, res) {
    console.log('회원종류 선택 페이지');

    res.render('./sign-up/select.ejs');
})

module.exports = router;