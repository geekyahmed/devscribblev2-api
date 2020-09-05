const User = require('../models/User')
const Post = require('../models/Post')
const isEmpty = require('../config/customFunctions')
const handleAsync = require('../utils/asyncFn')
const { generateResponse } = require('../utils/response')

exports.getPosts = handleAsync(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query
  const total = await Post.countDocuments()
  const posts = await Post.find({ author: req.user._id })
    .limit(limit)
    .skip((page - 1) * limit)
    .populate('author')
    .populate('category')

  return res.status(200).json({
    status: 'success',
    data: posts,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  })
})

exports.createPost = handleAsync(async (req, res, next) => {
  const { title, description, tags, isPublished } = req.body

  const newPost = await Post.create({ title, description, tags, isPublished })

  return res.status(200).json({
    status: 'success',
    msg: 'Post Created Successfully',
    data: newPost
  })
})

exports.updatePost = handleAsync(async (req, res) => {
  const { title, description, tags, isPublished } = req.body

  const updatedPost = await Post.findOne({ slug: slug }).then(post => {
    post.title = title
    post.description = description
    post.tags = tags
    post.isPublished = isPublished
  })
  
})
