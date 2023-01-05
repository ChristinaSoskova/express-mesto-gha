const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateInfo,
  updateAvatar
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateInfo);
router.patch('/me/avatar',updateAvatar);


module.exports = router;
