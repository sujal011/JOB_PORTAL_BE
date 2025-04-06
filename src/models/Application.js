import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status:{
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
    resume:{
        type: String, // URL to the uploaded resume
        required: true,
    }
})

export const Application = mongoose.model("Application", ApplicationSchema);