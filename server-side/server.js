const express = require("express");
const app = express();
const middleware = require("./middleware");
const birdwatchobservation = require("./routes/birdwatchobservation");
const DATABASECONNECT = require("./config/database");

const PORT = process.env.PORT || 5000; //PORT declaration, 5000 as a local port 

middleware(express, app); //middleware for cors controls

DATABASECONNECT(); //creating database connection

app.get("/", (req, res) => {
  res.send(req.file);
});

app.use("/api/birdwatchobservation", birdwatchobservation); // Creating api for birdwatchobservation route 

//listening to the declared port
app.listen(PORT, () => {
  console.log(`App is served on port ${PORT}`);
});