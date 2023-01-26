const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = require('../models/user');
const BadRequest = require('../errors/BadRequest'); // 400
const ConflictError = require('../errors/ConflictError'); // 409
const AuthError = require("../errors/AuthError");
const {NODE_ENV, JWT_SECRET} = process.env;
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  userSchema
    .findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new AuthError("Неправильные почта или пароль.");
      }
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError("Неправильные почта или пароль");
          }
          return user;
        })
        .then(() => {
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === "production" ? JWT_SECRET : "dev-key",
            { expiresIn: "7d" }
          );
          res.send({ token });
        })
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name, about, avatar }))
    .then((user) =>
      res.status(201).send({data: user}))
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictError("Пользователь с таким email уже существует"));
      } else if (error.name === "ValidationError") {
        next(
          new BadRequest(
            "Переданы некорректные данные при создании пользователя."
          ));
      } else {
        next(error);
      }
    })
};