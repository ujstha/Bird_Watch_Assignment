const experss = require("express");
const router = experss.Router();
const {
  birdWatchObservationSchemaValidator,
  Observation,
} = require("../models/birdwatchobservation");
const ExifExtractor = require("../exif-extractor");
const multer = require("multer");

//fetching data
router.get("/", async (req, res) => {
  const observations = await Observation.find(req.body.id);
  res.send(observations);
});

router.post(
  "/",
  multer({}).single("speciesImage"),//uploading single file so multer.single (while uploading multiple replace .single with .multiple)
  ExifExtractor,
  (req, res) => {
    const { error } = birdWatchObservationSchemaValidator(req.body); // Validating input body
    if (error) return res.status(400).send(error.details[0].message); // Validator error message if any error

    const observation = new Observation({
      speciesName: req.body.speciesName,
      rarity: req.body.rarity,
      notes: req.body.notes,
      speciesImage: req.body.speciesImage, //when using aws-multer comment this out
      // speciesImage: imageLocation, (when using aws-multer uncomment this)
      timestamp: req.body.timestamp,
      geoLatitude: req.body.geoLatitude,
      geoLongitude: req.body.geoLongitude,
    });
    // Save the file name into database
    observation.save();
    // Sends the response of 201 with json objects.
    res.status(201).json({
      observation: observation,
      msg: "Observation Data Added Successfully.",
    });
  }
);

module.exports = router;
