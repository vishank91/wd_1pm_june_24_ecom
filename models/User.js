const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Mendatory"]
    },
    username: {
        type: String,
        unique: true,
        required: [true, "User Name is Mendatory"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email Address is Mendatory"]
    },
    phone: {
        type: String,
        required: [true, "Phone Number is Mendatory"]
    },
    password: {
        type: String,
        required: [true, "Password is Mendatory"]
    },
    address: {
        type: String,
        default: ""
    },
    pin: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "Buyer"
    },
    active: {
        type: Boolean,
        default: true
    },
    pic: {
        type: String,
        default:""
    },
    otp:{
        type:Number
    }
})
const User = new mongoose.model("User", UserSchema)
module.exports = User