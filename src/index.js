import express from "express";
import connectDB from "./config/db.js"; 
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

connectDB();
// app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend server is running");
})

app.use("/api/users",userRoutes);
app.use("/api/jobs", jobRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
