const mongoose = require("mongoose")

const CheckoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User Id is Mendatory"]
    },
    orderStatus: {
        type: String,
        default: "Order is Placeed"
    },
    paymentMode: {
        type: String,
        default: "COD"
    },
    paymentStatus: {
        type: String,
        default: "Pending"
    },
    subtotal: {
        type: Number,
        required: [true, "Sub Total Amount is Mendatory"]
    },
    shipping: {
        type: Number,
        required: [true, "Shipping Amount is Mendatory"]
    },
    total: {
        type: Number,
        required: [true, "Total Amount is Mendatory"]
    },
    rppid: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            qty: {
                type: Number,
                required:[true,"Quantity Must Required"]
            },
            total: {
                type: Number,
                required:[true,"Total Must Required"]
            }
        }
    ]
})
const Checkout = new mongoose.model("Checkout", CheckoutSchema)
module.exports = Checkout