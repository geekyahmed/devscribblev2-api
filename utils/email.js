const Mailgun = require('mailgun-js')
const { generateResponse } = require('./response')

const sendEmail = (res, from, to, subject, body) => {
  const mailgun = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domian: process.env.MAILGUN_DOMAIN
})
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
    console.log(body)
  })
}

module.exports = sendEmail
