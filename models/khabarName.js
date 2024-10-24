const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Email", Schema)