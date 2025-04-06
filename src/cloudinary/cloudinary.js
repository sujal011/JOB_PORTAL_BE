import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadFile = async (filePath,public_id) => {
    try {
        const result = await cloudinary.uploader.upload(filePath,{
            resource_type:"raw",
            public_id:public_id,
            overwrite:true,
        });
        return result.secure_url; // Return the URL of the uploaded file
    } catch (error) {
        throw new Error('Error uploading file to Cloudinary: ' + error.message);
    }
}

