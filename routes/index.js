const router = require('express').Router();

router.use('/cards',  require('./cards'));
router.use('/users', require('./users'));

module.exports = router;