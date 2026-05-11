const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("KaamSetu API Running 🚀");
});

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});