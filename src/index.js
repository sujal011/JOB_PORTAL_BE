import express from "express";
import connectDB from "./config/db.js"; 
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.use(cors({
    origin: "*", // Replace with your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Backend server is running");
})

app.use("/api/users",userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
