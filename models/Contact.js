const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Person Name is Mendatory"]
    },
    email: {
        type: String,
        required: [true, "Email Name is Mendatory"]
    },
    phone: {
        type: String,
        required: [true, "Phone Name is Mendatory"]
    },
    subject: {
        type: String,
        required: [true, "Subject is Mendatory"]
    },
    message: {
        type: String,
        required: [true, "Message is Mendatory"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
})
const Contact = new mongoose.model("Contact", ContactSchema)
module.exports = Contact