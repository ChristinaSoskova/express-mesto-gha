const router = require('express').Router();

router.use('/cards',  require('./cards'));
router.use('/users', require('./users'));

router.use('/*', (req, res) => {
  return res.status(404).send({ message:'Ресурс не найден. Проверьте URL и метод запроса'})
});

module.exports = router;