const generateResponse = (res, status, statusCode, msg) => {
  return res.status(statusCode).json({
    status: status,
    msg: msg
  })
}

const generateErrResponse = (res, status, statusCode, err, msg) => {
 
  return res.status(statusCode).json({
    status: status,
    msg: msg,
    err: err.message
  });

}

module.exports = {generateResponse, generateErrResponse};