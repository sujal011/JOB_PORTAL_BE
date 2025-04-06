import { createApplication } from "../controlllers/applicationController.js";
import { protect } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

router.post("/",protect, createApplication)

export default router;