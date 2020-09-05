const User = require('../models/User')
const ApiError = require('../utils/error')
const sendEmail = require('../utils/email')

const sendToken = (res, statusCode, user) => {
  const token = user.getToken()

  const opts = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }

  if (process.env.NODE_ENV === 'production') {
    opts.secure = true
  }
  res
    .status(statusCode)
    .cookie('token', token, opts)
    .json({
      success: true,
      msg: `A verfication email has been sent to ${user.email}`,
      data: user,
      token
    })

  sendEmail(user.email, 'Verify Your Account', '/verifyPassword.hbs')
}

module.exports = { sendToken }
