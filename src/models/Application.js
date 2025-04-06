import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        unique: true,
        required: true,
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true,
    },
    status:{
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
})

export const Application = mongoose.model("Application", ApplicationSchema);