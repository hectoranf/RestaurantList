module.exports = app => {

    app.use('/api/restaurants', require('./restaurants.routes.js'))
}