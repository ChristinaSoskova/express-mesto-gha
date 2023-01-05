const userSchema = require("../models/user");

module.exports.getUsers = (req, res, next) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch((error) => {
      if (error.code === 400) {
        return res.status(error).send({ message:'Переданы некорректные данные при создании пользователя.'})
      } else {
        next(error);
      }
    });
  }

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  userSchema
    .create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
    if (error.code === 400) {
      return res.status(error).send({ message:'Переданы некорректные данные при создании пользователя.'})
    } else {
      next(error);
    }
  });
}

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  userSchema
    .findById(userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.code === 404) {
        return res.status(error).send({ message:'Пользователь по указанному _id не найден.'})
      } else {
        next(error);
      }
    });
  }
module.exports.updateInfo = (req, res, next) => {
  const { name, about } = req.body;
  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    )
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.code === 400) {
        return res.status(error).send({ message:'Переданы некорректные данные при обновлении профиля.'})
      } if(error.name === 404) {
        return res.status(error).send({ message:'Пользователь с указанным _id не найден.'})
      } else {
        next(error);
      }
    });
  }

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    )
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.code === 400) {
        return res.status(error).send({ message:'Переданы некорректные данные при обновлении аватара.'})
      } if(error.name === 404) {
        return res.status(error).send({ message:'Пользователь с указанным _id не найден.'})
      } else {
        next(error);
      }
    });
  }