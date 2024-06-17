const mongoose = require("mongoose")

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Testimonial Name is Mendatory"]
    },
    star: {
        type: Number,
        default:5
    },
    message: {
        type: String,
        required: [true, "Testimonial Message Must Required"]
    },
    active: {
        type: Boolean,
        default: true
    },
    pic: {
        type: String,
        required: [true, "Testimonial Pic Must Required"]
    }
})
const Testimonial = new mongoose.model("Testimonial", TestimonialSchema)
module.exports = Testimonial