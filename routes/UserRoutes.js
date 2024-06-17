const UserRouter = require("express").Router()
const { verifyAdmin, verifyBoth } = require("../middlewares/authentication")

const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord, login, forgetPassword1, forgetPassword2, forgetPassword3 } = require("../controller/UserController")
const { uploadUser } = require("../middlewares/fileUploadMiddleware")

UserRouter.post("/", createRecord)
UserRouter.get("/", verifyAdmin, getRecord)
UserRouter.get("/:_id", verifyBoth, getSingleRecord)
UserRouter.put("/:_id", uploadUser.single("pic"), verifyBoth, updateRecord)
UserRouter.delete("/:_id", verifyAdmin, deleteRecord)
UserRouter.post("/login", login)
UserRouter.post("/forget-password-1", forgetPassword1)
UserRouter.post("/forget-password-2", forgetPassword2)
UserRouter.post("/forget-password-3", forgetPassword3)

module.exports = UserRouter
