//dotenv
require('dotenv').config()

// Database config
require('./config/mongoose.config')

// App
const express = require('express')
const app = express()

require('./config/middleware.config')(app)

// Routes index
require('./routes')(app)

module.exports = app