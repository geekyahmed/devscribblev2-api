const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')
const { generateResponse } = require('./response')

const mailgunAuth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}

const smtpTransport = nodemailer.createTransport(mailGun(mailgunAuth))

const sendEmail = (res, receiver, subject, body) => {
  const mailOptions = {
    from: 'DevScribble <no-reply@devscribble.com>',
    to: receiver,
    subject: subject,
    html: body
  }

  smtpTransport.sendMail(mailOptions, err => {
    if (err) {
      return generateResponse(res, 'fail', 500, err.message)
    } else {
      return generateResponse(
        res,
        'success',
        200,
        `Email has been sent to ${receiver}`
      )
    }
  })
}

module.exports = sendEmail
