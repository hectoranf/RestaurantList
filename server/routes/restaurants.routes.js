const router = require("express").Router()
const Restaurant = require("../models/restaurant.model")
const passport = require("passport")

router.get("/", (req, res, next) => {
  Restaurant.find()
    .then((response) => res.json(response))
    .catch((err) => next(new Error(err)))
})

router.get("/:_id", (req, res, next) => {
  Restaurant.findById(req.params._id)
    .then((response) => res.json(response))
    .catch((err) => next(new Error(err)))
})

router.post("/", (req, res, next) => {
  console.log(req.body)
  Restaurant.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => next(new Error(err)))
})

router.put("/:_id", (req, res, next) => {
  const { name } = req.body
  console.log(req)
  Restaurant.findByIdAndUpdate(req.params._id, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => next(new Error(err)))
})

router.delete("/:_id", (req, res, next) => {
  Restaurant.findByIdAndDelete(req.params._id)
    .then(() => res.json({ message: "Restaurant deleted" }))
    .catch((err) => next(new Error(err)))
})

module.exports = router
