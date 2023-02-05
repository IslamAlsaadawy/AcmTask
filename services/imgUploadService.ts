const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dcmd5hby3",
    api_key: "196166632566848",
    api_secret: "d6Egs3cQWCSxwxCqUKwZIQcSMu8"
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