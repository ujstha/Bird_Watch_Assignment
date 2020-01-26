const cors = require("cors");
const bodyParser = require("body-parser");

const middleware = (express, app) => {
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
};

module.exports = middleware;
