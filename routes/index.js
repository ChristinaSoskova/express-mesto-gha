const router = require('express').Router();

router.use('/cards', require('./cards'));
router.use('/users', require('./users'));

router.use((req, res, next) => {
  // eslint-disable-next-line no-undef
  next(new NotFound('Такая страница не существует'));
});

module.exports = router;
