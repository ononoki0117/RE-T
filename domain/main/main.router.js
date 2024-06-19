const router = require('express').Router();

router.use(require('./patient/main.patient.router'));
router.use(require('./retner/main.retner.router'))

module.exports = router;