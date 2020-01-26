const mongoose = require("mongoose");
const Joi = require("joi");

const birdWatchObservationSchema = new mongoose.Schema({
  speciesName: { type: String, uppercase: true },
  rarity: { type: String },
  notes: { type: String },
  speciesImage: { type: String },
  timestamp: { type: Number },
  geoLatitude: { type: Number },
  geoLongitude: { type: Number },
  createdDate: { type: Date, default: Date.now },
});

function birdWatchObservationSchemaValidator(observationDataValid) {
  schema = {
    speciesName: Joi.string().required(),
    rarity: Joi.string()
      .valid("common", "rare", "extremely rare")
      .required(),
    notes: Joi.string().required(),
    speciesImage: Joi.string(),
    timestamp: Joi.number(),
    geoLatitude: Joi.number(),
    geoLongitude: Joi.number(),
  };
  return Joi.validate(observationDataValid, schema);
}

const Observation = mongoose.model("Observation", birdWatchObservationSchema);
module.exports = {
  birdWatchObservationSchemaValidator,
  birdWatchObservationSchema,
  Observation,
};
