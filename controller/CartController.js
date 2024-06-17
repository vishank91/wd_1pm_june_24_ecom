const { ObjectId } = require("mongodb")
const Cart = require("../models/Cart")

async function createRecord(req, res) {
    try {
        let data = new Cart(req.body)
        await data.save()
        let finalData = await Cart.findOne(
            { _id: data._id })
            .populate({ path: "user", select: "_id" })
            .populate({
                path: "product",
                select: "name color finalprice pic size quantity",
                populate: [
                    {
                        path: "maincategory",
                        select: "name -_id",
                    },
                    {
                        path: "subcategory",
                        select: "name -_id",
                    },
                    {
                        path: "brand",
                        select: "name -_id",
                    }
                ]
            }).exec()
        res.send({ result: "Done", data: finalData })
    } catch (error) {
        if (error.errors.user)
            res.status(400).send({ result: "Fail", reason: error.errors.user.message })
        else if (error.errors.product)
            res.status(400).send({ result: "Fail", reason: error.errors.product.message })
        else if (error.errors.qty)
            res.status(400).send({ result: "Fail", reason: error.errors.qty.message })
        else if (error.errors.total)
            res.status(400).send({ result: "Fail", reason: error.errors.total.message })
        else
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}
async function getRecord(req, res) {
    try {
        let data = await Cart.find(
            { user: req.params.userId })
            .populate({ path: "user", select: "_id" })
            .populate({
                path: "product",
                select: "name color finalprice pic size quantity",
                populate: [
                    {
                        path: "maincategory",
                        select: "name -_id",
                    },
                    {
                        path: "subcategory",
                        select: "name -_id",
                    },
                    {
                        path: "brand",
                        select: "name -_id",
                    }
                ]
            }).exec()
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}


async function updateRecord(req, res) {
    try {
        let data = await Cart.findOne({ _id: req.params._id })
        if (data) {
            data.qty = req.body.qty ?? data.qty
            data.total = req.body.total ?? data.total
            await data.save()
            res.send({ result: "Done", data: data })
        }
        else
            res.status(404).send({ result: "Fail", reason: "Record Not Found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Cart.findOne({ _id: req.params._id })
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
    updateRecord,
    deleteRecord
}