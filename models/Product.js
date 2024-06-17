const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name is Mendatory"]
    },
    maincategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Maincategory",
        required: [true, "Product Maincategory Id is Mendatory"]
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: [true, "Product Subcategory Id is Mendatory"]
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: [true, "Product Brand Id is Mendatory"]
    },
    color: {
        type: String,
        required: [true, "Product Color is Mendatory"]
    },
    size: {
        type: String,
        required: [true, "Product Size is Mendatory"]
    },
    baseprice: {
        type: Number,
        required: [true, "Product Base Price is Mendatory"]
    },
    discount: {
        type: Number,
        default: 0
    },
    finalprice: {
        type: Number,
        required: [true, "Product Final Price is Mendatory"]
    },
    quantity: {
        type: Number,
        default: 1
    },
    stock: {
        type: Boolean,
        default: true
    },
    active: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        default: ""
    },
    pic: []
})
const Product = new mongoose.model("Product", ProductSchema)
module.exports = Product