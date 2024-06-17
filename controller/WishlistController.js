const { ObjectId } = require("mongodb")
const Wishlist = require("../models/Wishlist")

async function createRecord(req, res) {
    try {
        let data = new Wishlist(req.body)
        await data.save()
        let finalData = await Wishlist.findOne(
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
        else
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}
async function getRecord(req, res) {
    try {
        let data = await Wishlist.find(
            { user: req.params.userId })
            .populate({ path: "user", select: "_id" })
            .populate({
                path: "product",
                select: "name color finalprice pic size",
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


async function deleteRecord(req, res) {
    try {
        let data = await Wishlist.findOne({ _id: req.params._id })
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