require('dotenv').config()
const Newsletter = require('../models/Newsletter')
const Subscriber = require('../models/Subscriber')
const nodemailer = require('nodemailer')

module.exports = {
    getComposeNewsletterPage: async(req, res)=> {
      const subscribers = await Subscriber.find()
        .then(subscribers => {
          res.render('admin/newsletter/compose', {
                    title: 'Compose Newsletter',

            subscribers: subscribers
          })
        })
    },
    composeNewsletter: async(req, res)=> {
        const title = req.body.title;
        const body = req.body.body;
        const subscribers = await Subscriber.find();

        const newsletterDetails = new Newsletter({
            title: title,
            subscribers: subscribers.email,
            body: body
        })
        newsletterDetails.save().then(newsLetter => {
                  const transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS
                      }
                    })
                    const mailOptions = {
                      from: 'ElixirBlog <newsletter@elixirblog.com>',
                      to: subscribers,
                      subject: title,
                      text: body
                                        }
                    transporter.sendMail(mailOptions, err => {
                      if (err) {
                        console.log(err)
                      } else {
                        req.flash(
                          'success-message',
                         ` Newsletter Sent `
                        )
                        res.redirect('/dashboard/newsletter')
                      }
                    })
        })
    }
}