import express from "express";
import { login, register, saveTheJobApi, uploadResume } from "../controlllers/userController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { getApplicantApplications } from "../controlllers/applicationController.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login)
router.post("/upload-resume", protect,upload.single("resume"), uploadResume); // New route for uploading resume
router.get("/applications", protect, getApplicantApplications);
router.post("/savethejob",protect,saveTheJobApi) // New route for getting applications

export default router;