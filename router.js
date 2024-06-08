var router = require('express').Router();
const controller = require('./controller');

// Setting router module
router.use('/', require('./domain/login/login.router.js'));
router.use('/', require('./domain/sign-up/sign-up.router.js'))


router.route('/')
    .get(controller.checkUserLogin)

module.exports = router;