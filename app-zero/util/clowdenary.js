import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successful
        console.log("file is uploaded on cloudinary successfully ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const deleteOnCloudinary = async (publicId) => {
    if (!publicId) return null
    try {
        const response = await cloudinary.uploader.destroy(publicId, { type: "upload" })
        return response
    } catch (error) {
        return null
    }

}

const resizeImage = (id) => {

    try {
        const response = cloudinary.image(
            `${id}`,
            {
                transformation: [
                    { width: 500, crop: "scale" },
                    { height: 500, crop: "scale" }, 
                    { quality: "auto" },
                ]
            },

        )
        return response
    } catch (error) {
        console.log('error in resize image', error);

    }
}


export { uploadOnCloudinary, deleteOnCloudinary, resizeImage }