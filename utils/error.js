class ApiError extends Error {
  constructor (message, statusCode) {
    super(message)

    this.statusCode = statusCode
    this.message = `${statusCode}`.startsWith('4') ? 'fail' : 'error'

    Error.captureStackTrace(this, this.constructor)
  }
}
module.exports = ApiError
