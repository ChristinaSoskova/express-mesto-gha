const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: [2, `-Ведите имя от 2 до 30 символов, введено {VALUE}.`],
    maxlength: [30, `-Ведите имя от 2 до 30 символов, введено {VALUE}.`],
  },
  about: {
    type: String,
    minlength: [2, `-О себе от 2 до 30 символов, введено {VALUE}.`],
    maxlength: [30, `-О себе от 2 до 30 символов, введено {VALUE}.`],
    required: true,
  },
  avatar:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('user', userSchema);