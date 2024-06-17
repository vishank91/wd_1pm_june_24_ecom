const User = require("../models/User")
const passwordValidator = require('password-validator');
const fs = require("fs")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const transporter = require("../mail/index")

var schema = new passwordValidator()
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(50)                                  // Maximum length 100
    .has().uppercase(1)                              // Must have uppercase letters
    .has().lowercase(1)                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123'])

async function createRecord(req, res) {
    if (schema.validate(req.body.password)) {

        let data = new User(req.body)
        bcrypt.hash(req.body.password, 12, async (error, hash) => {
            if (error)
                res.send({ result: "Fail", error: "Internal Server Error" })
            else {
                data.password = hash
                try {
                    await data.save()
                    let mailOptions = {
                        from: process.env.MAIL_SENDER,
                        to: data.email,
                        subject: "Your Account is Created : ECOM",
                        text: `
                                Hello ${data.name}
                                Your account has been created
                                Team Ecom
                            `
                    }
                    transporter.sendMail(mailOptions, (error) => {
                    })
                    res.send({ result: "Done", data: data })
                } catch (error) {
                    var errorMessage = {}
                    if (error.keyValue?.email)
                        errorMessage.email = "Email Address is Already Exist"
                    if (error.keyValue?.username)
                        errorMessage.username = "Username is Already Exist"
                    if (error?.errors?.name)
                        errorMessage.name = error.errors.name.message
                    if (error?.errors?.email)
                        errorMessage.email = error.errors.email.message
                    if (error?.errors?.username)
                        errorMessage.username = error.errors.username.message
                    if (error?.errors?.phone)
                        errorMessage.phone = error.errors.phone.message
                    if (Object.keys(errorMessage).length === 0)
                        errorMessage.error = "Internal Server Error"

                    res.send({ result: "Fail", error: errorMessage })
                }
            }
        })
    }
    else
        res.send({ result: "Fail", error: "Invalid Password, Password Must Contains atleast 8 Characters,must contains 1 Lower Case Character,1 Upper Case Character,1 Digti and Shold not Contains Space, and Length Should be less than 50" })
}
async function getRecord(req, res) {
    try {
        let data = await User.find().sort({ _id: -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function getSingleRecord(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data)
            res.send({ result: "Done", data: data })
        else
            res.status(404).send({ result: "Fail", reason: "Record Not Found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function updateRecord(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.phone = req.body.phone ?? data.phone
            data.address = req.body.address ?? data.address
            data.pin = req.body.pin ?? data.pin
            data.city = req.body.city ?? data.city
            data.state = req.body.state ?? data.state
            data.active = req.body.active ?? data.active
            if (req.file) {
                try {
                    fs.unlinkSync(data.pic)
                } catch (error) { }
                data.pic = req.file.path
            }
            await data.save()
            res.send({ result: "Done", data: data })
        }
        else
            res.status(404).send({ result: "Fail", reason: "Record Not Found" })
    } catch (error) {
        var errorMessage = {}
        if (error?.errors?.name)
            errorMessage.name = error.errors.name.message
        if (error?.errors?.phone)
            errorMessage.phone = error.errors.phone.message
        if (Object.keys(errorMessage).length === 0)
            errorMessage.error = "Internal Server Error"

        res.send({ result: "Fail", error: errorMessage })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(`public/User/${data.pic}`)
            } catch (error) { }
            await data.deleteOne()
            res.send({ result: "Done" })
        }
        else
            res.status(404).send({ result: "Fail", reason: "Record Not Found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}
async function login(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username },
            ]
        })
        if (data) {
            if (await bcrypt.compare(req.body.password, data.password))
                jwt.sign({ data }, data.role === "Admin" ? process.env.ADMIN_SECRET_KEY : process.env.BUYER_SECRET_KEY, { expiresIn: 60 * 60 * 24 * 2 }, (error, token) => {
                    if (error)
                        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
                    else
                        res.send({ result: "Done", data: data, token: token })
                })
            else
                res.status(401).send({ result: "Fail", reason: "Invalid Username or Password" })
        }
        else
            res.status(401).send({ result: "Fail", reason: "Invalid Username or Password" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}
async function forgetPassword1(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username },
            ]
        })
        if (data) {
            let num = Math.floor((Math.random() * 10000000000) % 1000000)
            let mailOptions = {
                from: process.env.MAIL_SENDER,
                to: data.email,
                subject: "OTP for Password Reset : ECOM",
                text: `
                        Hello ${data.name}
                        Your OTP for Password Reset is ${num}
                        Please do not share OTP with anyone
                        Team Ecom
                    `
            }
            transporter.sendMail(mailOptions, (error) => {
            })
            data.otp = num
            await data.save()
            res.send({ result: "Done", message: "OTP Sent on Your Registered Email Address" })
        }
        else
            res.status(401).send({ result: "Fail", reason: "User Not Found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function forgetPassword2(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username },
            ]
        })
        if (data) {
            if (req.body.otp == data.otp)
                res.send({ result: "Done", message: "OTP Matched" })
            else
                res.send({ result: "Fail", message: "Invalid OTP" })
        }
        else
            res.status(401).send({ result: "Fail", reason: "Unauthorised Activity" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function forgetPassword3(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username },
            ]
        })
        if (data) {
            bcrypt.hash(req.body.password, 12, async (error, hash) => {
                if (error)
                    res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
                else {
                    data.password = hash
                    await data.save()
                    let mailOptions = {
                        from: process.env.MAIL_SENDER,
                        to: data.email,
                        subject: "Passwor Has Been Reset : ECOM",
                        text: `
                                Hello ${data.name}
                                Your Password Has Been Reset Successfully
                                Team Ecom
                            `
                    }
                    transporter.sendMail(mailOptions, (error) => {
                    })
                    res.send({ result: "Done", message: "Password Reset Successfully" })
                }
            })
        }
        else
            res.status(401).send({ result: "Fail", reason: "Unauthorised Activity" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

module.exports = {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord,
    login,
    forgetPassword1,
    forgetPassword2,
    forgetPassword3
}