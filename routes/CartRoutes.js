const CartRouter = require("express").Router()
const { verifyBuyer } = require("../middlewares/authentication")
const { createRecord, getRecord, updateRecord, deleteRecord } = require("../controller/CartController")


CartRouter.post("/",verifyBuyer, createRecord)
CartRouter.get("/:userId",verifyBuyer, getRecord)
CartRouter.put("/:_id",verifyBuyer, updateRecord)
CartRouter.delete("/:_id",verifyBuyer, deleteRecord)

module.exports = CartRouter
