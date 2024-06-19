const router = require('express').Router();
const controller = require('./main.retner.controller');

router.route('/retner/main')
    .get(controller.getRetnerMainPage);

module.exports = router;