const router = require('express').Router();
const NotFound = require('../errors/NotFound');

router.use('/cards', require('./cards'));
router.use('/users', require('./users'));

router.use('/*', (req, res, next) => {
  next(new NotFound('Такая страница не существует'));
});

module.exports = router;
