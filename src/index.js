import express from "express";
import connectDB from "./config/db.js"; 

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
    res.send("Backend server is running");
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
