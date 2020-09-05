const mongoose = require('mongoose')
const Schema = mongoose.Schema
const convertDate = require('../utils/date')

const CommentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  createdAt: {
    type: String,
    default: convertDate()
  },
  updatedAt: {
    type: String,
    default: convertDate()
  }
})

module.exports = { Comment: mongoose.model('comment', CommentSchema) }
