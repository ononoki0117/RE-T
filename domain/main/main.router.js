const router = require('express').Router();

router.use(require('./patient/main.patient.router'));

module.exports = router;