const SubcategoryRouter = require("express").Router()
const { verifyAdmin } = require("../middlewares/authentication")

const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controller/SubcategoryController")


SubcategoryRouter.post("/", verifyAdmin, createRecord)
SubcategoryRouter.get("/", getRecord)
SubcategoryRouter.get("/:_id", getSingleRecord)
SubcategoryRouter.put("/:_id", verifyAdmin, updateRecord)
SubcategoryRouter.delete("/:_id", verifyAdmin, deleteRecord)

module.exports = SubcategoryRouter
