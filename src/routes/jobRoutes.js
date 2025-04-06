import express from "express";
import * as jobController from "../controlllers/jobController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, jobController.createJob);
router.get("/", protect,jobController.getAllJobs);
router.get("/employer/my-jobs", protect, jobController.getEmployerJobs);
router.get("/search", protect, jobController.getJobsByTitle);
router.get("/skills", protect, jobController.getJobsBySkills);
router.delete("/:id", protect, jobController.deleteJob);

export default router;
