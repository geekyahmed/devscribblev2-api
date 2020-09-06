const handleAsync = require('../utils/asyncFn')

exports.index = (req, res) => {
  return res.status(200).json({
    status: 'success',
    msg: 'Welcome to DevScribble V2'
  })
}
