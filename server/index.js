const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./db/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

// database configuration
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

app.listen(process.env.PORT, function () {
    console.log(`Server is running on PORT:${process.env.PORT}`.bgCyan.white);
});