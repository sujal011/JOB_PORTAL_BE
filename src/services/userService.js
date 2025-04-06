import { generateToken, hashPassword, verifyPassword } from "../lib/utils.js";
import { User } from "../models/index.js";

export const registerUser = async (userData)=>{
    const {name, email, password, role} = userData;
    const userExists = await User.findOne({email});
    if(userExists){
        throw new Error("User already exists");
    }
    const hashedPassword = await hashPassword(password)
    const user = await User.create({
        name,
        email,
        hashedPassword,
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