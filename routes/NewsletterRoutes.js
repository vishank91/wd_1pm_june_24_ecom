const NewsletterRouter = require("express").Router()
const { verifyAdmin } = require("../middlewares/authentication")

const { createRecord, getRecord, deleteRecord } = require("../controller/NewsletterController")


NewsletterRouter.post("/", createRecord)
NewsletterRouter.get("/", verifyAdmin, getRecord)
NewsletterRouter.delete("/:_id", verifyAdmin, deleteRecord)

module.exports = NewsletterRouter
