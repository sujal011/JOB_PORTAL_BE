import {loginUser, registerUser,saveTheJob,updateUserResume} from "../services/userService.js"
import { uploadFile } from "../cloudinary/cloudinary.js";
import { dataUri } from '../middleware/upload.js'
import { getUserByEmail } from "../services/userService.js";

export const register = async(req,res)=>{
    try {
        const {name,email,password,role} = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields (name, email, password, role) are required",
            });
        }
        
        const user = await registerUser(name,email,password,role)
        if(!user){
            return res.status(400).json({
                message:"User not created"
            })
        }
        return res.status(201).json({
            message:"User created successfully",
            user:{
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

export const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const {user,token} = await loginUser(email, password)
        if(!user){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }
        return res.status(200).json({
            message:"User logged in successfully",
            user:{
                name:user.name,
                email:user.email,
                role:user.role
            },
            token
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}


export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }
        if(req.file) {
            const user = await getUserByEmail(req.user.email)
            if (!user) {
                return res.status(404).json({ message: "User not Loggedin properly" });
            }
            const file = dataUri(req).content;
    
            const resumeUrl = await uploadFile(file,`${user.email}_resume`)
            const updatedUser = await updateUserResume(user.email, resumeUrl);
            
            return res.status(200).json({
                message: "Resume uploaded successfully",
                resume: updatedUser.resume,
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const saveTheJobApi = async (req, res) => {
    try{
        const user = await getUserByEmail(req.user.email);  
        if (!user) {
            return res.status(404).json({ message: "User not logged in properly" });
        }
        if (user.role !== "jobseeker") {
            return res.status(403).json({ message: "Only jobseekers can save jobs." });
        }
        const jobId = req.body.jobId;
        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required" });
        }
        const updatedUser = await saveTheJob(user._id, jobId);
        if (!updatedUser) {
            return res.status(404).json({ message: "Job not found or already saved" });
        }
        return res.status(200).json({
            message: "Job saved successfully",
            savedJobs: updatedUser.savedJobs,
        });      

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}