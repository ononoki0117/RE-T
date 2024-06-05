var router = require('express').Router();

router.get('/login', function (req, res) {
    console.log('로그인 페이지');

    res.render('./login/login.ejs');
});

module.exports = router;