const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const bcryptSalt = 10
const { check, validationResult } = require('express-validator')

const JWTstrategy = require('passport-jwt').Strategy

module.exports = (app) => {
	passport.use(
		'signup',
		new localStrategy((username, password, next) => {
			const salt = bcrypt.genSaltSync(bcryptSalt)
			const hashPass = bcrypt.hashSync(password, salt)

			User.create({ username, password: hashPass })
				.then((user) => next(null, user))
				.catch((err) => next(null, false, { message: 'Error creating user' }))
		})
	)

	passport.use(
		'login',
		new localStrategy((username, password, next) => {
			User.findOne({ username })
				.then((user) => {
					if (!user) return next(null, false, { message: 'User not found' })
					if (!bcrypt.compareSync(password, user.password))
						return next(null, false, { message: 'Wrong Password' })

					return next(null, user, { message: 'Logged in Successfully' })
				})
				.catch((err) => next(new Error(err)))
		})
	)

	const cookieExtractor = (req) => {
		let token = null
		if (req && req.cookies) token = req.cookies['jwt']
		return token
	}

	const opts = { secretOrKey: process.env.TOKEN_SECRET, jwtFromRequest: cookieExtractor }

	passport.use(
		new JWTstrategy(opts, (jwt_payload, next) => {
			console.log(jwt_payload)
			User.findOne({ _id: jwt_payload.user._id }, (err, user) => {
				if (err) {
					return next(err, false)
				}
				if (user) {
					next(null, user)
				} else {
					next(null, false)
				}
			})
		})
	)
}
