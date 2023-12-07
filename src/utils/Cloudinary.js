import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRECT,
});

const uploadOnCloudinary = async (localFilPath) => {
    try {
        if (!localFilPath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilPath, {
            resource_type: "auto",
        });
        // file has been upload successfull
        // console.log ("file is uploaded on cloudinary", response.url)
        fs.unlinkSync(localFilPath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilPath); //remove the loclly sevd temporary file as the upload operatio got failed
        return null;
    }
};

export { uploadOnCloudinary };
