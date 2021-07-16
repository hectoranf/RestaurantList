const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const bcryptSalt = 10
const { check, validationResult } = require('express-validator')

const JWTstrategy = require('passport-jwt').Strategy

module.exports = (app) => {
	passport.use(
		'login',
		new localStrategy((username, password, next) => {
			User.findOne({ username })
				.then((user) => {
					if (!user) return next(null, false, { message: 'User not found' })

					if (!bcrypt.compareSync(password, user.password))
						return next(null, false, { message: 'Wrong Password' })

					return next(null, user)
				})
				.catch((err) => res.status(500).json(err))
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
			User.findOne({ _id: jwt_payload.user._id }, (err, user) => {
				if (err) {
					return next(err, false)
				}
				if (user) {
					next(null, user)
				} else {
					next(null, false, { msg: 'unauthenticated' })
				}
			})
		})
	)
}
