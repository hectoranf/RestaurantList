const express = require('express')
const logger = require('morgan')
var cookieParser = require('cookie-parser')

module.exports = (app) => {
	app.use(logger('dev'))
	//bodyParser is deprecated
	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))
	app.use(cookieParser())
}
