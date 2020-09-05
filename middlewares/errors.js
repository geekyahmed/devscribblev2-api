const ApiError = require('../utils/error')

const handleError = (err, req, res, next) => {
  let error = {
    ...err
  }
  error.message = err.message
  if (err.name === 'CastError') {
    const msg = `Resource not available`
    error = new ApiError(msg, 404)
  }
  if (err.code === 11000) {
    const msg = `Resource not available`
    error = new ApiError(msg, 400)
  }
  if (err.name === 'ValidationError') {
    const message = []
    Object.values(err.errors).forEach(err => {
      message.push({
        field: err.properties.path,
        message: err.message
      })
    })
  }
  res.status(error.statusCode || 500).json({
    status: 'fail',
    code: error.statusCode,
    msg: 'Internal Server Error'
  })
}

module.exports = handleError
