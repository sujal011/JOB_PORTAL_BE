// src/controllers/jobController.js
import * as jobService from "../services/jobService.js";
import { getUserByEmail } from "../services/userService.js";

export const createJob = async (req, res) => {
    try {
        const user = await getUserByEmail(req.user.email);
        
        if (!user) {
            return res.status(404).json({ message: "User not logged in properly" });
        }
        if (user.role !== "employer") {
            return res.status(403).json({ message: "Only employers can post jobs." });
        }

        const jobData = {
            ...req.body,
            postedBy: req.user.id
        };

        const job = await jobService.createJob(jobData);
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobService.getAllJobs();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getJobsBySkills = async (req, res) => {
    try {
        const { skills } = req.body;
        const jobs = await jobService.getJobsBySkills(skills);
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEmployerJobs = async (req, res) => {
    try {
        const jobs = await jobService.getJobsByEmployer(req.user.id);
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const job = await jobService.deleteJob(req.params.id, req.user.id);
        if (!job) return res.status(403).json({ message: "Not authorized or job not found" });
        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
