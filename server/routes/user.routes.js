const router = require('express').Router()
const User = require('../models/user.model')

router.get('/', (req, res, next) => {
	User.findById(req.user._id)
		.populate('favouriteRestaurants')
		.then((response) => {
			const { _id, username, favouriteRestaurants } = response
			console.log(_id)
			return res.json({
				user: { _id, username, favouriteRestaurants },
			})
		})
		.catch((err) => next(err))
})

//Update favourites/unfavourites
router.put('/updateFavourites/:_id', (req, res) => {
	User.findByIdAndUpdate(req.params._id, { favouriteRestaurants: req.body }, { new: true })
		.populate('favouriteRestaurants')
		.then((response) => res.json(response))
		.catch((err) => res.status(500).json(err))
})

module.exports = router
