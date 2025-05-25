import { generateToken, hashPassword, verifyPassword } from "../lib/utils.js";
import { User } from "../models/index.js";

export const registerUser = async (name,email,password,role)=>{
    const userExists = await User.findOne({email});
    if(userExists){
        throw new Error("User already exists");
    }
    const hashedPassword = await hashPassword(password)
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    });    
    return user;
}

export const loginUser = async (email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error("User not found")
    }
    const isPasswordValid = await verifyPassword(password, user.password);
    if(!isPasswordValid){
        throw new Error("Invalid password")
    }
    const token = generateToken(user);
    return {user, token};   
}   

export const getUserByEmail = async (email) => {
    return await User.findOne({ email });
}

export const updateUserResume = async (email, resumeUrl) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }
    user.resume = resumeUrl;
    await user.save();
    return user;
};

export const updateUser = async (email,userData) =>{
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }
    user = userData
    return await user.save()
}

export const saveTheJob = async (userId, jobId) => {
    const updateData = {
        $addToSet: { savedJobs: jobId } // Use $addToSet to avoid duplicates
    };
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
}