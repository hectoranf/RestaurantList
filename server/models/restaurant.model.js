const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestaurantSchema = new Schema({

    id: {
        type: Number
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    neighborhood: {
        type: String,
        required: true,
        trim: true
    },
    photograph: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    latlng: {
        lat: Number,
        lng: Number
    },
    image: {
        type: String,
        required: true
    },
    cuisine_type: {
        type: String,
        enum: ['Asian', 'Pizza', 'American', 'Mexican', 'Italian', 'Spanish', 'French', 'Other'],
        required: true,
        trim: true
    },
    operating_hours: {
        Monday: String,
        Tuesday: String,
        Wednesday: String,
        Thursday: String,
        Friday: String,
        Saturday: String,
        Sunday: String
    },
    reviews: [{
        name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        rating: {
            type: Number,
            required: true
        },
        comments: {
            type: String,
            required: true,
            trim: true
        }
    }],


}, {
    timestamps: true,
})

const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

module.exports = Restaurant