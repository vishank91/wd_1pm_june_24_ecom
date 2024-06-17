const Testimonial = require("../models/Testimonial")
const fs = require("fs")

async function createRecord(req, res) {
    try {
        let data = new Testimonial(req.body)
        if (req.file) {
            data.pic = req.file.path
        }
        await data.save()
        res.send({ result: "Done", data: data })
    } catch (error) {
        if (error.keyValue)
            res.status(400).send({ result: "Fail", reason: "Testimonial Name is Already Exist" })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", reason: error.errors.name.message })
        else if (error.errors.pic)
            res.status(400).send({ result: "Fail", reason: error.errors.pic.message })
        else if (error.errors.message)
            res.status(400).send({ result: "Fail", reason: error.errors.message.message })
        else
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}
async function getRecord(req, res) {
    try {
        let data = await Testimonial.find().sort({ _id: -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function getSingleRecord(req, res) {
    try {
        let data = await Testimonial.findOne({ _id: req.params._id })
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
        let data = await Testimonial.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.star = req.body.star ?? data.star
            data.message = req.body.message ?? data.message
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
        if (error.keyValue)
            res.status(400).send({ result: "Fail", reason: "Testimonial Name is Already Exist" })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", reason: "Name Must Required" })
        else if (error.errors.message)
            res.status(400).send({ result: "Fail", reason: error.errors.message.message })
        else
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Testimonial.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(data.pic)
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

module.exports = {
    createRecord,
    getRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
}