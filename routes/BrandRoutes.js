const BrandRouter = require("express").Router()
const { verifyAdmin } = require("../middlewares/authentication")
const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controller/BrandController")
const { uploadBrand } = require("../middlewares/fileUploadMiddleware")

BrandRouter.post("/",verifyAdmin,uploadBrand.single("pic"), createRecord)
BrandRouter.get("/", getRecord)
BrandRouter.get("/:_id", getSingleRecord)
BrandRouter.put("/:_id",verifyAdmin,uploadBrand.single("pic"), updateRecord)
BrandRouter.delete("/:_id",verifyAdmin, deleteRecord)

module.exports = BrandRouter
