const TestimonialRouter = require("express").Router()
const { verifyAdmin } = require("../middlewares/authentication")

const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controller/TestimonialController")
const { uploadTestimonial } = require("../middlewares/fileUploadMiddleware")

TestimonialRouter.post("/", uploadTestimonial.single("pic"), verifyAdmin, createRecord)
TestimonialRouter.get("/", getRecord)
TestimonialRouter.get("/:_id", getSingleRecord)
TestimonialRouter.put("/:_id", uploadTestimonial.single("pic"), verifyAdmin, updateRecord)
TestimonialRouter.delete("/:_id", verifyAdmin, deleteRecord)

module.exports = TestimonialRouter
