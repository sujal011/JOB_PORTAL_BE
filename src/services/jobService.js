import { Job } from "../models/index.js";
import { getUserByEmail } from "./userService.js";

export const createJob = async (jobData) => {
    jobData.skillsRequired = jobData.skillsRequired.split(',').map(skill => skill.trim());
    const job = await Job.create(jobData);
    return job;
};

export const getAllJobs = async () => {
    return await Job.find().populate("postedBy", "name email");
};

export const getJobsByTitle = async (title) => {
    return await Job.find({ title: { $regex: title, $options: "i" } });
};

export const getJobsBySkills = async (skills) => {
    if (!Array.isArray(skills) || skills.length === 0) {
        throw new Error("Skills must be a non-empty array");
    }
    return await Job.find({ skillsRequired: { $in: skills } });
};

export const getJobsByEmployer = async (email) => {
    const user = await getUserByEmail(email)
    return await Job.find({ postedBy: user._id });
};

export const deleteJob = async (jobId, userId) => {
    const job = await Job.findOneAndDelete({ _id: jobId, postedBy: userId });
    return job;
};
