const Product = require("../models/Product")
const Newsletter = require("../models/Newsletter")
const fs = require("fs")
const transporter = require("../mail/index")

async function createRecord(req, res) {
    try {
        let data = new Product(req.body)
        if (req?.files?.length) {
            data.pic = req.files.map((item) => item.path)
            await data.save()

            let emails = await Newsletter.find()
            for (let item of emails) {
                let mailOptions = {
                    from: process.env.MAIL_SENDER,
                    to: item.email,
                    subject: "New Product Listed : ECOM",
                    text: `
                            New Product Listed
                            Visit Our Official Website and Checkout
                            Team Ecom
                        `
                }
                transporter.sendMail(mailOptions, (error) => {
                })
            }
            let item = await Product.findOne({ _id: data._id }).populate("maincategory").populate("subcategory").populate("brand").exec()
            res.send({ result: "Done", data: item })
        }
        else {
            res.status(400).send({ result: "Fail", reason: "Atleast 1 Product Image Must Required" })
        }
    } catch (error) {
        if (error.errors.name)
            res.status(400).send({ result: "Fail", reason: error.errors.name.message })
        else if (error.errors.maincategory)
            res.status(400).send({ result: "Fail", reason: error.errors.maincategory.message })
        else if (error.errors.subcategory)
            res.status(400).send({ result: "Fail", reason: error.errors.subcategory.message })
        else if (error.errors.brand)
            res.status(400).send({ result: "Fail", reason: error.errors.brand.message })
        else if (error.errors.color)
            res.status(400).send({ result: "Fail", reason: error.errors.color.message })
        else if (error.errors.size)
            res.status(400).send({ result: "Fail", reason: error.errors.size.message })
        else if (error.errors.baseprice)
            res.status(400).send({ result: "Fail", reason: error.errors.baseprice.message })
        else if (error.errors.finalprice)
            res.status(400).send({ result: "Fail", reason: error.errors.finalprice.message })
        else if (error.errors.pic)
            res.status(400).send({ result: "Fail", reason: error.errors.pic.message })
        else
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}
async function getRecord(req, res) {
    try {
        let data = await Product.find().populate("maincategory").populate("subcategory").populate("brand").exec()
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function getSingleRecord(req, res) {
    try {
        let data = await Product.find({ _id: req.params._id }).populate("maincategory").populate("subcategory").populate("brand").exec()
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function updateRecord(req, res) {
    try {
        let data = await Product.findOne({ _id: req.params._id })
        if (data) {
            let oldPic = req.body.oldPic.split(",")
            data.name = req.body.name ?? data.name
            data.maincategory = req.body.maincategory ?? data.maincategory
            data.subcategory = req.body.subcategory ?? data.subcategory
            data.brand = req.body.brand ?? data.brand
            data.color = req.body.color ?? data.color
            data.size = req.body.size ?? data.size
            data.baseprice = req.body.baseprice ?? data.baseprice
            data.discount = req.body.discount ?? data.discount
            data.finalprice = req.body.finalprice ?? data.finalprice
            data.quantity = req.body.quantity ?? data.quantity
            data.stock = req.body.stock ?? data.stock
            data.description = req.body.description ?? data.description
            data.active = req.body.active ?? data.active
            if (req.files) {
                for (let item of data.pic) {
                    try {
                        if (!(req.body.oldPic.includes(item)))
                            fs.unlinkSync(item)
                    } catch (error) { }
                }
                data.pic = req.files.map((item) => item.path).concat(oldPic).filter((x) => x !== "")
            }
            await data.save()
            let item = await Product.findOne({ _id: req.params._id }).populate("maincategory").populate("subcategory").populate("brand").exec()
            res.send({ result: "Done", data: item })
        }
        else {
            res.status(404).send({ result: "Fail", reason: "Record Not Found" })
        }
    } catch (error) {
        if (error.errors.name)
            res.status(400).send({ result: "Fail", reason: error.errors.name.message })
        else if (error.errors.maincategory)
            res.status(400).send({ result: "Fail", reason: error.errors.maincategory.message })
        else if (error.errors.subcategory)
            res.status(400).send({ result: "Fail", reason: error.errors.subcategory.message })
        else if (error.errors.brand)
            res.status(400).send({ result: "Fail", reason: error.errors.brand.message })
        else if (error.errors.color)
            res.status(400).send({ result: "Fail", reason: error.errors.color.message })
        else if (error.errors.size)
            res.status(400).send({ result: "Fail", reason: error.errors.size.message })
        else if (error.errors.baseprice)
            res.status(400).send({ result: "Fail", reason: error.errors.baseprice.message })
        else if (error.errors.finalprice)
            res.status(400).send({ result: "Fail", reason: error.errors.finalprice.message })
        else if (error.errors.pic)
            res.status(400).send({ result: "Fail", reason: error.errors.pic.message })
        else
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}

async function updateQuantity(req, res) {
    try {
        let data = await Product.findOne({ _id: req.params._id })
        if (data) {
            data.quantity = req.body.quantity ?? data.quantity
            if(data.quantity==0)
                data.stock=false
            
            await data.save()
            console.log("Done", data)
            res.send({ result: "Done", data: data })
        }
        else {
            console.log("Not Found")
            res.status(404).send({ result: "Fail", reason: "Record Not Found" })
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Product.findOne({ _id: req.params._id })
        if (data) {
            for (let item of data.pic) {
                try {
                    fs.unlinkSync(item)
                } catch (error) { }
            }
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
    updateQuantity,
    deleteRecord
}