import { config } from 'dotenv';
config()
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'dbeciwqkp', 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const folderPath = 'uploads'; 
    const publicId = `${file.fieldname}-${Date.now()}`;
    return {
      folder: folderPath,
      public_id: publicId,
      allowed_formats: ['jpg', 'png'],
    };
  },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  };

export const upload = multer({ storage,fileFilter });
