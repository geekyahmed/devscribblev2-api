const crypto = require('crypto')
const Token = require('../models/Token')
const sendEmail = require('../utils/email')

const sendToken = (req, res, user) => {
  const token = Token.create({
    _userId: user._id,
    token: crypto.randomBytes(15).toString('hex')
  })
  const link = `${req.protocol}://${req.headers.host}/api/v1/auth/verify/${token.token}`
  const body = `
  <h1>Complete Your Email Verification</h1>
  <br/>
  <h3>Hi There,</h3><br/>
  <p>Please, complete your email verification to be able to use DevScribble and explore the developer community</p><br/>
  <p>Clink on this link to verify your account : ${link}</p>
  `
  sendEmail(res, user.email, 'Complete Email Verification', body)
}

module.exports = sendToken
