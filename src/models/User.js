import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ["jobseeker", "employer"],
        required: true,
    },
    resume: {
        type: String, // URL to the uploaded resume
        default: null, // Optional field
    },
}, { timestamps: true });

export const User = mongoose.model("User",UserSchema)
