const ContactRouter = require("express").Router()
const { verifyAdmin } = require("../middlewares/authentication")

const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controller/ContactController")


ContactRouter.post("/", createRecord)
ContactRouter.get("/", verifyAdmin, getRecord)
ContactRouter.get("/:_id", verifyAdmin, getSingleRecord)
ContactRouter.put("/:_id", verifyAdmin, updateRecord)
ContactRouter.delete("/:_id", verifyAdmin, deleteRecord)

module.exports = ContactRouter
