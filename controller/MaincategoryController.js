const Maincategory = require("../models/Maincategory")

async function createRecord(req, res) {
    try {
        let data = new Maincategory(req.body)
        await data.save()
        res.send({ result: "Done", data: data })
    } catch (error) {
        if (error.keyValue)
            res.status(400).send({ result: "Fail", reason: "Maincategory Name is Already Exist" })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", reason: error.errors.name.message })
        else
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}
async function getRecord(req, res) {
    try {
        let data = await Maincategory.find().sort({ _id: -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function getSingleRecord(req, res) {
    try {
        let data = await Maincategory.findOne({ _id: req.params._id })
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
        let data = await Maincategory.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.active = req.body.active ?? data.active
            await data.save()
            res.send({ result: "Done", data: data })
        }
        else
            res.status(404).send({ result: "Fail", reason: "Record Not Found" })
    } catch (error) {
        if (error.keyValue)
            res.status(400).send({ result: "Fail", reason: "Maincategory Name is Already Exist" })
        else if (error.errors.name)
            res.status(400).send({ result: "Fail", reason: error.errors.name.message })
        else
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Maincategory.findOne({ _id: req.params._id })
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