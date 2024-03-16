const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    if (conn) {
        console.log(`Connected to MongoDB Database LocalHost`.bgMagenta.white);
    }
    else {
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
};

module.exports = connectDB;
