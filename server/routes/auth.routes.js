const router = require('express').Router()
const passport = require('passport')
const { check, validationResult } = require('express-validator')

const jwt = require('jsonwebtoken')

const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const bcryptSalt = 10

router.post(
	'/signup',
	[
		check('username')
			.isLength({ min: 5 })
			.withMessage('Name should have min 5 characters.')
			.custom((value) => {
				return User.findOne({ username: value }).then((user) => {
					if (user) {
						return Promise.reject('The username already exists')
					}
				})
			}),
		check('password')
			.isLength({ min: 4 })
			.withMessage('Password min 4 characters')
			.matches(/\d/)
			.withMessage('Password must contain a number')
			.matches(/\D/)
			.withMessage('Password must contain a letter'),
	],
	(req, res, next) => {
		const passCheck = validationResult(req)

		if (!passCheck.isEmpty()) {
			res.status(400).json({ message: passCheck.errors })
			return
		}

		const { username, password } = req.body

		const salt = bcrypt.genSaltSync(bcryptSalt)
		const hashPass = bcrypt.hashSync(password, salt)

		User.create({ username, password: hashPass })
			.then((user) => res.status(200).json({ message: 'User saved' }))
			.catch((err) =>
				res.status(500).json({ message: 'Error saving user to DB. Please try again.' })
			)
	}
)

router.post('/login', async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if (err) {
				res.status(500).json({ message: 'Error authenticating user' })
				return
			}

			if (!user) {
				res.status(401).json(info)
				return
			}

			req.login(user, { session: false }, async (err) => {
				if (err) return next(err)

				const body = { _id: user._id, username: user.username, role: user.role }

				const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET)

				res.cookie('jwt', token, {
					httpOnly: true,
					maxAge: 24 * 60 * 60 * 1000,
					sameSite: 'none',
					secure: 'true',
				})

				res.send({
					message: 'You are logged in',
				})
			})
		} catch (error) {
			return next(error)
		}
	})(req, res, next)
})

router.post('/logout', (req, res) => {
	res.cookie('jwt', '', { maxAge: 0 })

	res.send({
		message: 'You are logged out',
	})
})

module.exports = router
