const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const bcryptSalt = 10

const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

module.exports = app => {
    
    passport.use('signup',
        new localStrategy(
            (username, password, next) => {

                const salt = bcrypt.genSaltSync(bcryptSalt)
                const hashPass = bcrypt.hashSync(password, salt)
                
                User.create({ username, password: hashPass})
                    .then(user => next(null, user))
                    .catch(err => next(new Error(err)))
            }
        )
    )

    passport.use('login',
        new localStrategy(
            (username, password, next) => {
                User.findOne({ username })
                    .then(user => {
                        if (!user) return next(null, false, { message: 'User not found' })
                        if (!bcrypt.compareSync(password, user.password)) return next(null, false, { message: 'Wrong Password' })

                        return next(null, user, { message: 'Logged in Successfully' })
                    })
                    .catch(err => next(new Error(err)))
            }
        )
    )

    passport.use(
        new JWTstrategy({
                secretOrKey: process.env.TOKEN_SECRET,
                jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            },
            async (token, next) => {
                try {
                    return next(null, token.user)
                } catch (error) {
                    next(error)
                }
            }
        )
    )
 
}

