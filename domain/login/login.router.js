var router = require('express').Router();

const controller = require('./login.contorller');

router
    .route('/login')
    .get(controller.getLoginPage)
    .post(controller.attemptLogin);

module.exports = router;