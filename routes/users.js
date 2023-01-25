const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateInfo,
  updateAvatar
} = require('../controllers/users');

const {
  validationUpdateUser,
  validationUpdateAvatar,
  validationUserId,
} = require('../middlewares/validations')

router.get('/', getUsers);
// router.get('/me', getCurrentUser);
router.get('/:userId',validationUserId, getUserById);
router.patch('/me', validationUpdateUser, updateInfo);
router.patch('/me/avatar',validationUpdateAvatar, updateAvatar);


module.exports = router;
