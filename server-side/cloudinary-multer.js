require("dotenv").config();
const cloudinary = require("cloudinary");
const msc = require("multer-storage-cloudinary");

const env = process.env;

//Config of cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});
//storing image to cloudinary using multer
msc({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "jpeg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
  exif: true,
  resource_type: ["image", "raw"],
});

const CloudinaryUpload = async (req, res, file, next) => {
  if (file && file.originalname && file.buffer) {
    cloudinary.v2.uploader
      .upload_stream({ resource_type: "image" }, function(error, result) {
        if (error) console.log("Error : " + error);
        else {
          req.body.speciesImage = result.secure_url; //assigning url as a value for speciesImage
          next();
        }
      })
      .end(file.buffer);
  } else {
    //if no file found then default/backup image
    req.body.speciesImage =
      "https://res.cloudinary.com/doo4zgtkg/image/upload/v1554456888/oxaumv0ucwgcbks7lcjp.jpg";
    next();
  }
};

module.exports = { CloudinaryUpload }; //async function so curly braces.
