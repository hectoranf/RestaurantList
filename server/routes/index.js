const passport = require('passport')

module.exports = (app) => {
	app.set('trust proxy', 1)
	app.use('/api/restaurants', require('./restaurants.routes.js'))
	app.use(
		'/api/user',
		passport.authenticate('jwt', { session: false }),
		require('./user.routes.js')
	)
	app.use('/api/files', require('./files.routes.js'))

	app.use('/api', require('./auth.routes.js'))
}
