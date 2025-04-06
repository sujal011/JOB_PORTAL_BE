import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    company:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    salary:{
        type: Number,
        required: true,
    },
    skillsRequired:{
        type: [String],
        required: true,
    },
    experienceRequired:{
        type: Number,
        required: true,
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export const Job = mongoose.model("Job",JobSchema)