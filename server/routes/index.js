module.exports = app => {

    app.use('/api/restaurants', require('./restaurants.routes.js'))
    app.use('/api', require('./auth.routes.js'))
}