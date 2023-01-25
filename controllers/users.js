const userSchema = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BadRequest = require("../errors/BadRequest");
const NotFound = require("../errors/NotFound");
const ConflictError = require("../errors/ConflictError");

module.exports.getUsers = (req, res, next) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      userSchema.create({ email, password: hash, name, about, avatar })
    )
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictError("Пользователь с таким email уже существует"));
      } else if (error.name === "ValidationError") {
        next(
          new BadRequest(
            "Переданы некорректные данные при создании пользователя."
          )
        );
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
        throw new NotFound("Пользователь по указанному _id не найден.");
      }
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        next(new BadRequest("Передан некорретные данные"));
        return;
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
      { new: true, runValidators: true }
    )
    .then((user) => {
      if (!user) {
        throw new NotFound("Пользователь не найден");
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(
          BadRequest("Переданы некорректные данные при обновлении профиля.")
        );
      } else if (error.name === "CastError") {
        throw new NotFound("Пользователь с указанным _id не найден.");
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
      { new: true, runValidators: true }
    )
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(
          BadRequest("Переданы некорректные данные при обновлении профиля.")
        );
      } else if (error.name === "CastError") {
        throw new NotFound("Пользователь с указанным _id не найден.");
      } else {
        next(error);
      }
    });


  module.exports.getCurrentUser = (req, res, next) => {
    userSchema
      .findById(req.user._id)
      .then((user) => {
        if (!user) {
          throw new NotFound("Пользователь не найден");
        }
        res.send({ data: user });
      })
      .catch((error) => {
        if (error.name === "CastError") {
          next(BadRequest("Переданы некорректные данные"));
        } else {
          next(error);
        }
      });
  };
};
