const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema
const convertDate = require('../utils/date')

mongoose.plugin(slug)

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    slug: 'title',
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  createdAt: {
    type: String,
    default: convertDate()
  },
  updatedAt: {
    type: String,
    default: convertDate()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ],
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'reaction'
    }
  ],
  allowComments: {
    type: Boolean,
    default: false
  },
  coverImg: {
    type: String,
    default: ''
  },
  views: {
    type: Number
  },
  isPublished: {
    type: Boolean,
    default: false
  }
})

PostSchema.pre('save', function (next) {
  this.slug = this.title.split(' ').join('-')
  next()
})

const Post = mongoose.model('post', PostSchema)

module.exports = Post
