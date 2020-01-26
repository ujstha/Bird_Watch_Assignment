const exif = require("exif-parser");
const { CloudinaryUpload } = require("./cloudinary-multer");

const ExifExtractor = (req, res, next) => {
  try {
    const parser = exif.create(req.file.buffer);
    const result = parser.parse();
    req.body.geoLatitude = result.tags.GPSLatitude;
    req.body.geoLongitude = result.tags.GPSLongitude;
    req.body.timestamp = result.tags.DateTimeOriginal;
  } catch (error) {
    res.send("Error : Uploading Data was not found.")
  }
  CloudinaryUpload(req, res, req.file, next);
};

module.exports = ExifExtractor;
