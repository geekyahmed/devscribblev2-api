require('dotenv').config()
const express = require('express')
const { connectDevDB, connectProdDB } = require('./config/db')
const fileUpload = require('express-fileupload')
const path = require('path')
const helmet = require('helmet')
const xss = require('xss-clean')
const app = express()
const handleError = require('./middlewares/errors')
const routes = require('./routes/routes')
const cookieParser = require('cookie-parser')

//Setting Up Express
app.use(express())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//File Upload Middleware
app.use(fileUpload())

app.use(helmet())

app.use(xss())

routes(app)

//Configure Environments
switch (app.get('env')) {
  case 'development':
    connectDevDB()
    break
  case 'production':
    connectProdDB()
    break
  default:
    throw Error('Unknown Environment')
}

app.use(cookieParser())

// app.use(handleError)

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

//LIsten To Server and Port Number
const port = process.env.PORT || 3333
app.listen(port, () => {
  console.log(`DevScribble Is Running At ${port}`)
})
