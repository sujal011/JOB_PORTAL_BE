import express from "express";
import { login, register, uploadResume } from "../controlllers/userController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login)
router.post("/upload-resume", protect,upload.single("resume"), uploadResume); // New route for uploading resume

export default router;