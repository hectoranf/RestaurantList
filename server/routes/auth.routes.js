const router = require("express").Router()
const passport = require('passport');

const jwt = require('jsonwebtoken')

const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const bcryptSalt = 10

router.post('/signup',
    passport.authenticate('signup', { session: false }), async (req, res, next)=> {
        res.json({
            message: 'Signup successful',
            user: req.user
        })
    }
)

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.')
            return next(error)
          }

          req.login(user, { session: false }, async (err) => {
              if (err) return next(err)

                const body = { _id: user._id, username: user.username, role: user.role }
                const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET)

              return res.json({ token })
            })
        } catch (error) {
          return next(error)
        }
      }
    )(req, res, next)
  })


module.exports = router
