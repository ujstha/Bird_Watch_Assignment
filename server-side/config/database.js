require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const env = process.env;

const DATABASECONNECT = () => {
  mongoose
    .connect(
      env.MONGODB_URI,
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("Connected to database");
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = DATABASECONNECT;
