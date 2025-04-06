import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const protect = (req,res,next)=>{
    const token = req.header("Authorization").split(" ")[1];
    if(!token){
        return res.status(401).json({
            message:"Please provide a token."
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        req.user = decoded;
        next()
    }catch(error){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}