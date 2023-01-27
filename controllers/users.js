const userSchema = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');

module.exports.getUsers = (req, res, next) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  userSchema
    .findById(req.user._id)
    .orFail(new NotFound('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Введен некорректный _id пользователя'));
      } else {
        next(error);
      }
    });
};

module.exports.getUserById = (req, res, next) => {
  userSchema
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь по указанному _id не найден.');
      }
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Передан некорретные данные'));
      } else {
        next(error);
      }
    });
};

module.exports.updateInfo = (req, res, next) => {
  const { name, about } = req.body;
  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      // eslint-disable-next-line no-undef
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new BadRequest('Переданы некорректные данные при обновлении профиля.'),
        );
      } else {
        next(error);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      // eslint-disable-next-line no-undef
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(
          new BadRequest('Переданы некорректные данные при обновлении профиля.'),
        );
      } else {
        next(error);
      }
    });
};
