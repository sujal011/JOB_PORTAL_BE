import {loginUser, registerUser} from "../services/userService.js"

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