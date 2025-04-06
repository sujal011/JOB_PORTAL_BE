import { Application } from "../models/index.js";

export const createApplication = async (applicationData) => {
    try {
        const newApplication = new Application(applicationData);
        await newApplication.save();
        return newApplication;
    } catch (error) {
        throw new Error(`Failed to create application: ${error.message}`);
    }
};