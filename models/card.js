const mongoose = require('mongoose');
const cardValidator = require('validator');

 const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return cardValidator.isURL(v);
      },
      message:
        '-Ведите правильный URL для ссылки',
    },
  },
  owner:{
    type: Object,
    required: true,
  },
  likes: [{
    type: Object,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('card', cardSchema);