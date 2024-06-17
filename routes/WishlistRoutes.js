const WishlistRouter = require("express").Router()
const { verifyBuyer } = require("../middlewares/authentication")

const { createRecord, getRecord, deleteRecord } = require("../controller/WishlistController")


WishlistRouter.post("/", verifyBuyer, createRecord)
WishlistRouter.get("/:userId", verifyBuyer, getRecord)
WishlistRouter.delete("/:_id", verifyBuyer, deleteRecord)

module.exports = WishlistRouter
