const mongoose = require("mongoose")

const MaincategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Maincategory Name is Mendatory"]
    },
    active: {
        type: Boolean,
        default: true
    },
})
const Maincategory = new mongoose.model("Maincategory", MaincategorySchema)
module.exports = Maincategory