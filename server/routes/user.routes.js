const router = require("express").Router()
const User = require("../models/user.model")

router.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  })
})

//Update favourites/unfavourites
router.put("/updateFavourites/:_id", (req, res) => {
  User.findByIdAndUpdate(
    req.params._id,
    { favouriteRestaurants: req.body },
    { new: true }
  )
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err))
})

module.exports = router
