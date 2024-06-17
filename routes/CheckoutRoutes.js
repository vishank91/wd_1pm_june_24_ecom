const CheckoutRouter = require("express").Router()
const { verifyBuyer, verifyAdmin, verifyBoth } = require("../middlewares/authentication")

const { createRecord, getRecord, getUserRecord, updateRecord, deleteRecord, order, verifyOrder } = require("../controller/CheckoutController")


CheckoutRouter.post("/", verifyBuyer, createRecord)
CheckoutRouter.get("/", verifyAdmin, getRecord)
CheckoutRouter.get("/:userId", verifyBuyer, getUserRecord)
CheckoutRouter.put("/:_id", verifyAdmin, updateRecord)
CheckoutRouter.delete("/:_id", verifyAdmin, deleteRecord)
CheckoutRouter.post("/orders", verifyBoth, order)
CheckoutRouter.post("/verify", verifyBoth, verifyOrder)

module.exports = CheckoutRouter
