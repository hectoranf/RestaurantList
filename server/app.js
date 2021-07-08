require('dotenv').config()

// Database config
require('./config/mongoose.config')

// App
const express = require('express')
const app = express()

require('./config/middleware.config')(app)

module.exports = app