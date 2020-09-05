const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const handleAsync = require('../utils/asyncFn')

exports.getDashboard = handleAsync(async (req, res, next) => {
  const user = req.user.id
  const currentUser = await User.findById(user)
  return res.status(200).json({
    status: 'success',
    data: currentUser
  })
})
