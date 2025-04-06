import { createApplication, getApplications, updateApplicationStatus } from "../controlllers/applicationController.js";
import { protect } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

router.post("/",protect, createApplication)
router.get("/:jobId",protect, getApplications) // New route for getting applications
router.put("/:applicationId",protect, updateApplicationStatus) // New route for getting applications
export default router;