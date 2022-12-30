import { Schema } from 'mongoose';

export const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true
  },
  owner:{
    type: Object,
    required: true
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

module.exports = Schema.model('card', cardSchema);