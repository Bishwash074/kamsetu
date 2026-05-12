const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const connectDB = require("./config/db");
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (req,res)=>{
    res.send("KaamSetu API Running 🚀");
});

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});