const Newsletter = require("../models/Newsletter")
const transporter = require("../mail/index")

async function createRecord(req, res) {
    try {
        let data = new Newsletter(req.body)
        let mailOptions = {
            from: process.env.MAIL_SENDER,
            to: data.email,
            subject: "Your Email Address is Registered With us : ECOM",
            text: `
                    Your Email Address is Registered With us
                    Now we can send emails regarding latest proucts and great deals
                    Team Ecom
                `
        }
        transporter.sendMail(mailOptions, (error) => {
        })
        await data.save()
        res.send({ result: "Done", data: data })
    } catch (error) {
        if (error.keyValue)
            res.status(400).send({ result: "Fail", reason: "Email Address is Already Registered" })
        else if (error.errors.email)
            res.status(400).send({ result: "Fail", reason: error.errors.email.message })
        else
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}
async function getRecord(req, res) {
    try {
        let data = await Newsletter.find().sort({ _id: -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}


async function deleteRecord(req, res) {
    try {
        let data = await Newsletter.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.send({ result: "Done" })
        }
        else
            res.status(404).send({ result: "Fail", reason: "Record Not Found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

module.exports = {
    createRecord,
    getRecord,
    deleteRecord
}