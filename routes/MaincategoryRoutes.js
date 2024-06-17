const MaincategoryRouter = require("express").Router()
const { verifyAdmin } = require("../middlewares/authentication")

const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controller/MaincategoryController")

MaincategoryRouter.post("/", verifyAdmin, createRecord)
MaincategoryRouter.get("/", getRecord)
MaincategoryRouter.get("/:_id", getSingleRecord)
MaincategoryRouter.put("/:_id", verifyAdmin, updateRecord)
MaincategoryRouter.delete("/:_id", verifyAdmin, deleteRecord)

module.exports = MaincategoryRouter
