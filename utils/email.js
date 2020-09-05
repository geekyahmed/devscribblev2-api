const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domian: process.env.MAILGUN_DOMAIN
})
const { generateResponse } = require('./response')

const sendEmail = (res, from, to, subject, body) => {
  const data = {
    from: from,
    to: to,
    subject: subject,
    html: body
  }

  mailgun.messages().send(data, (err, body) => {
    if (err) {
      generateResponse(res, 'fail', 400, err.message)
    }
    return data
  })
}

module.exports = sendEmail
