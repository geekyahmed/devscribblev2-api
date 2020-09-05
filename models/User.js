const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const convertDate = require('../utils/date')
mongoose.plugin(slug)

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  username: {
    type: String,
    slug: 'name',
    unique: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: [155, 'Bio must be less than 150 words']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required']
  },
  social_links: [
    {
      facebook: {
        type: String
      },
      twitter: {
        type: String
      },
      linkedin: {
        type: String
      },
      instagram: {
        type: String
      },
      github: {
        type: String
      }
    }
  ],
  isVerified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be six characters long'],
    select: 'false'
  },

  createdAt: {
    type: String,
    default: convertDate()
  },
  updatedAt: {
    type: String,
    default: convertDate()
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date
})

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'postId',
  justOne: false,
  count: true
})
UserSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'userId',
  justOne: false,
  count: true
})

UserSchema.pre('find', function () {
  this.populate({ path: 'posts' })
})

// Encrypt Password
UserSchema.pre('save', async function (next) {
  convertDate(this.createdAt)
  if (!this.isModified('password')) {
    next()
  }
  this.email = this.email.toLowerCase()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (pwd) {
  return await bcrypt.compare(pwd, this.password)
}

UserSchema.methods.getToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

const User = mongoose.model('user', UserSchema)

module.exports = User
