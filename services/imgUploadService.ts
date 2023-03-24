const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

  
  export const uploadImage = async (imgPath) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };

      try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imgPath, options);
        console.log(result);
        return result.url;
      } catch (error) {
        console.error(error);
      }
  }

  module.exports = {uploadImage};