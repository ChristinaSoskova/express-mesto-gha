const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, '-Пользователь с таким адресом уже зарегистрирован.'],
    required: [true, '-Почта обязательна.'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректый адрес почты',
    },
  },
  password: {
    type: String,
    required: [true, '-Пароль обязателен.'],
    select: false,
  },
  name: {
    type: String, // имя — это строка
    required: false,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный адрес URL',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
