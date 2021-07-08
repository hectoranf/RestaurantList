const mongoose = require('mongoose')
const Restaurant = require('./../models/restaurant.model')
const restaurantList = require('./restaurants.json')

mongoose.connect('mongodb://localhost/restaurants-list', { useNewUrlParser: true, useUnifiedTopology: true })
Restaurant.collection.drop()

Restaurant.create(restaurantList)
    .then(res => {
        console.log(`${res.length} restaurants were created.`)
        mongoose.connection.close()
    })
    .catch(err => console.log(`An ERROR occurred: ${err}`))

