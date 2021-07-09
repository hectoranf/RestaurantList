const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.model');

router.get('/', (req, res, next) => {
    Restaurant.find()
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))
})

router.get('/:_id', (req, res, next) => {
    Restaurant.findById(req.params._id)
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))
})

router.post('/', (req, res, next) => {
    console.log(req.body)
    Restaurant.create(req.body)
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))

})

router.delete('/:_id', (req, res, next) => {
    console.log(req.body)
    Restaurant.findByIdAndDelete(req.params._id)
        .then(() => res.json({ message: 'Restaurant deleted' }))
        .catch(err => next(new Error(err)))

})

module.exports = router