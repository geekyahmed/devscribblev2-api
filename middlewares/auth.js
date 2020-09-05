const jwt = require('jsonwebtoken')
const handleAsync = require('../utils/asyncFn')
const { generateResponse } = require('../utils/response')

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return generateResponse(res, 'fail', 401, err.message)
      }
      req.user = user
      next()
    })
  } else {
    generateResponse(res, 'fail', 401, 'Unauthorized')
  }
}

exports.authorize = () => {}
