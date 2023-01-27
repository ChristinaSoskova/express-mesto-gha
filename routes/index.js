const router = require('express').Router();
const NotFound = require('../errors/NotFound').default;

router.use('/cards', require('./cards').default);
router.use('/users', require('./users'));

router.use('/*', (req, res, next) => {
  next(new NotFound('Такая страница не существует'));
});

module.exports = router;
