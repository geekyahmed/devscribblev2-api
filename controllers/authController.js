const User = require('../models/User')
const { generateResponse } = require('../utils/response')
const sendToken = require('../services/token.service')
const handleAsync = require('../utils/asyncFn')
const jwt = require('jsonwebtoken')
const refreshTokens = []

exports.registerUser = handleAsync(async (req, res, next) => {
  const { name, email, password } = req.body
  await User.findOne({ email: email })
    .then(async user => {
      if (!user) {
        const registeredUser = await User.create({ name, email, password })
        sendToken(req, res, registeredUser)
      } else {
        generateResponse(res, 'fail', 400, `${user.email} has been used`)
      }
    })
    .catch(err => {
      generateResponse(res, 'fail', 500, err.message)
    })
})

exports.loginUser = handleAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    generateResponse(res, 'fail', 400, 'Email and Password Required')
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return generateResponse(res, 'fail', 400, "User doesn't exists")
  }

  const matchPassword = await user.comparePassword(password)

  if (!matchPassword) {
    return generateResponse(res, 'fail', 400, 'Email or Password is incorrect')
  }
  const token = user.getToken()
  const refreshToken = user.getToken()

  refreshTokens.push(refreshToken)

  res.cookie('token', token, { maxAge: '86400' * 1000 })
  res.status(200).json({
    data: user,
    token: token,
    refreshToken: refreshToken
  })
})

exports.renewToken = handleAsync(async (req, res, next) => {
  const { token } = req.body
  if (!token) {
    return generateResponse(res, 'fail', 401, 'Unauthorized')
  }
  if (!refreshTokens.includes(token)) {
    return generateResponse(res, 'fail', 401, 'Unauthorizsed')
  }

  jwt.verify(token, process.env.JWT_REFRESH_TOKEN, (err, user) => {
    if (err) {
      return generateResponse(res, 'fail', 403, err.message)
    }

    const token = user.getToken()

    return res.status(200).json({
      token: token
    })
  })
})

exports.resetPassword = handleAsync(async (req, res, next) => {
  const { email } = req.body

  const emailExists = await User.findOne({ email: email })

  if (!emailExists) {
  }
})
