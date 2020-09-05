const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema = new Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200
  }
})

const Token = mongoose.model('token', TokenSchema)

module.exports = Token
