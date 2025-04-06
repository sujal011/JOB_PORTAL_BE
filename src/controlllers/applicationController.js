import * as applicationService from "../services/applicationService.js";
import { getUserByEmail } from "../services/userService.js";

export const createApplication = async (req, res) => {
    try {
        const user = await getUserByEmail(req.user.email)
        if (!user) {
            return res.status(404).json({ message: "User not logged in properly" });
        }
        
        if (user.role !== "jobseeker") {
            return res.status(403).json({ message: "Only job seekers can apply for jobs." });
        }
        const { jobId } = req.body;
        const applicationData = {
            job:jobId,
            applicant: user._id,
            status: "pending",
            resume: user.resume,

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