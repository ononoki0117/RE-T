const controller = require('./sign-up.controller');
var router = require('express').Router();

router.use(require('./patient/sign-up.patient.router.js'))
router.use(require('./re-tner/sign-up.re-tner.router.js'))

router.route('/sign-up/select')
    .get(controller.enterSelect)
    .post();

module.exports = router;