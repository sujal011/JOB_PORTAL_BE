import { Application } from "../models/index.js";

export const hasAlreadyApplied = async (applicantId, jobId) => {
    try {
        const existingApplication = await Application.findOne({ applicant: applicantId, job: jobId });
        return !!existingApplication;
    } catch (error) {
        throw new Error(`Failed to check existing application: ${error.message}`);
    }
};

export const createApplication = async (applicationData) => {
    try {
        const newApplication = new Application(applicationData);
        return await newApplication.save();
    } catch (error) {
        throw new Error(`Failed to create application: ${error.message}`);
    }
};

export const getApplicationsByJobId = async (jobId) => {
    try {
        const applications = await Application.find({ job: jobId }).populate("applicant", "name email resume");
        return applications;
    } catch (error) {
        throw new Error("Failed to fetch applications: " + error.message);
        
    }
}

export const getApplicationsByApplicantId = async (applicantId) => {
    try {
        const applications = await Application.find({ applicant: applicantId }).populate("job", "title company");
        return applications;
    } catch (error) {
        throw new Error("Failed to fetch applications: " + error.message);
    }
};
export const updateApplicationStatus = async (applicationId, status) => {
    try {
        const updatedApplication = await Application.findByIdAndUpdate(
            applicationId,
            { status },
            { new: true }
        );
        return updatedApplication;
    } catch (error) {
        throw new Error("Failed to update application status: " + error.message);
    }
};
