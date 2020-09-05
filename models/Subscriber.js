const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubscriberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now()
  }
})

const Subscriber = mongoose.model('subscriber', SubscriberSchema)

module.exports = Subscriber
