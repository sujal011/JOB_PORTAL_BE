import * as applicationService from "../services/applicationService.js";
import { getUserByEmail } from "../services/userService.js";

export const createApplication = async (req, res) => {
    try {
        console.log("hello");
        
        const user = await getUserByEmail(req.user.email)
        if (!user) {
            return res.status(404).json({ message: "User not logged in properly" });
        }
        
        if (user.role !== "jobseeker") {
            return res.status(403).json({ message: "Only job seekers can apply for jobs." });
        }
        if(!user.resume){
            return res.status(403).json({ message: "Upload your resume first." });
        }
        const { jobId } = req.body;
        const applicationData = {
            job:jobId,
            applicant: user._id,
        };
        const application = await applicationService.createApplication(applicationData);
        if(!application) {
            return res.status(400).json({ message: "Application failed" });
        }
        return res.status(201).json({
            message: "Application submitted successfully",
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getApplications = async (req, res) => {
    try {
        const user = await getUserByEmail(req.user.email)
        if (!user) {
            return res.status(404).json({ message: "User not logged in properly" });
        }
        
        if (user.role !== "employer") {
            return res.status(403).json({ message: "Only employers can view applications." });
        }
        const applications = await applicationService.getApplicationsByJobId(req.params["jobId"]);
        if(!applications) {
            return res.status(404).json({ message: "No applications found for this job" });
        }
        return res.status(200).json(applications);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getApplicantApplications = async (req, res) => {
    try {
        const user = await getUserByEmail(req.user.email)
        if (!user) {
            return res.status(404).json({ message: "User not logged in properly" });
        }
        
        if (user.role !== "jobseeker") {
            return res.status(403).json({ message: "Only job seekers can view their applications." });
        }
        const applications = await applicationService.getApplicationsByApplicantId(user._id);
        if(!applications) {
            return res.status(404).json({ message: "No applications found for this applicant" });
        }
        return res.status(200).json(applications);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateApplicationStatus = async (req, res) => {
    try {
        const user = await getUserByEmail(req.user.email)
        if (!user) {
            return res.status(404).json({ message: "User not logged in properly" });
        }
        
        if (user.role !== "employer") {
            return res.status(403).json({ message: "Only employers can update application status." });
        }
        const { status } = req.body;
        const updatedApplication = await applicationService.updateApplicationStatus(req.params["applicationId"], status);
        if(!updatedApplication) {
            return res.status(400).json({ message: "Failed to update application status" });
        }
        return res.status(200).json({
            message: "Application status updated successfully",
            updatedApplication,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}