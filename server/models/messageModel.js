const mongoose = require("mongoose");

const mongooseSchema = mongoose.model({
    message: {
        type: String,
        required: true,
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true })