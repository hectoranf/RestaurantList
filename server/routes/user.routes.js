const router = require('express').Router()
const User = require('../models/user.model')

router.get('/', (req, res, next) => {
	const { _id, username, favouriteRestaurants, role } = req.user
	res.json({
		msg: 'You made it to the secure route',
		user: { _id, username, favouriteRestaurants, role },
	})
})

//Update favourites/unfavourites
router.put('/updateFavourites/:_id', (req, res) => {
	User.findByIdAndUpdate(req.params._id, { favouriteRestaurants: req.body }, { new: true })
		.then((response) => res.json(response))
		.catch((err) => res.status(500).json(err))
})

module.exports = router
