import multer from 'multer'
import path from 'path';
import DataURIParser from 'datauri/parser.js';

const storage = multer.memoryStorage();
export const upload = multer({ storage }); // 'resume' is the name of the file input field in the form

const dUri = new DataURIParser();
export const dataUri = (req) =>{
    return dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
} 
    
