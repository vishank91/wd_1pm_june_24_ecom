const Contact = require("../models/Contact")
const transporter = require("../mail/index")

async function createRecord(req, res) {
    try {
        let data = new Contact(req.body)
        await data.save()
        let mailOptions = {
            from: process.env.MAIL_SENDER,
            to: data.email,
            subject: "Your Query Has Been Received : ECOM",
            text: `
                    Hello ${data.name}
                    Your Query Has Been Received
                    Our Team Will Contact You Soon
                    Team Ecom
                `
        }
        transporter.sendMail(mailOptions, (error) => {
        })
        res.send({ result: "Done", data: data })
    } catch (error) {
        if (error.errors.name)
            res.status(400).send({ result: "Fail", reason: error.errors.name.message })
        else if (error.errors.email)
            res.status(400).send({ result: "Fail", reason: error.errors.email.message })
        else if (error.errors.phone)
            res.status(400).send({ result: "Fail", reason: error.errors.phone.message })
        else if (error.errors.subject)
            res.status(400).send({ result: "Fail", reason: error.errors.subject.message })
        else if (error.errors.message)
            res.status(400).send({ result: "Fail", reason: error.errors.message.message })
        else
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}
async function getRecord(req, res) {
    try {
        let data = await Contact.find().sort({ _id: -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function getSingleRecord(req, res) {
    try {
        let data = await Contact.findOne({ _id: req.params._id })
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
        let data = await Contact.findOne({ _id: req.params._id })
        if (data) {
            data.active = req.body.active ?? data.active
            let mailOptions = {
                from: process.env.MAIL_SENDER,
                to: data.email,
                subject: "Your Query Has Been Resolved : ECOM",
                text: `
                        Hello ${data.name}
                        Your Query Has Been Resolved
                        If You Still Have any Issue, Please Contact Us Again
                        Team Ecom
                    `
            }
            transporter.sendMail(mailOptions, (error) => {
            })
            await data.save()
            res.send({ result: "Done", data: data })
        }
        else
            res.status(404).send({ result: "Fail", reason: "Record Not Found" })
    } catch (error) {
        if (error.keyValue)
            res.status(400).send({ result: "Fail", reason: "Contact Name is Already Exist" })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", reason: error.errors.name.message })
        else
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Contact.findOne({ _id: req.params._id })
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
    getSingleRecord,
    updateRecord,
    deleteRecord
}