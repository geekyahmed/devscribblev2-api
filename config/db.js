const mongoose = require('mongoose')
const db = {
  development: {
    connectionString: process.env.MONGODB_URL
  },
  production: {
    connectionString: process.env.MONGOATLAS_URL
  }
}

const opts = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  useUnifiedTopology: true,
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

//Configure DB
const connectDevDB = () => {
  mongoose
    .connect(db.development.connectionString, opts)
    .then(() => {
      console.log(`MongoDB Development Is Running`)
    })
    .catch(err => {
      throw Error('An Error Ocurred')
    })
}

const connectProdDB = () => {
  mongoose
    .connect(db.production.connectionString, opts)
    .then(() => {
      console.log(`MongoDB Production Is Running`)
    })
    .catch(err => {
      throw Error('An Error Ocurred')
    })
}

module.exports = { connectDevDB, connectProdDB }
