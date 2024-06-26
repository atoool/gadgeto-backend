require("dotenv").config();
// Import express
const express = require("express");
// Import Body parser
const bodyParser = require("body-parser");
// Initialise the app
const app = express();
const cors = require("cors");

// Import routes
let apiRoutes = require("./src/router");

const db = require("./src/model");
const dbConfig = require("./src/config/db.config");
const roleInitiate = require("./src/utils/roleInitiate");

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
};
app.use(cors(corsOptions));

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
db.mongoose
  .connect(`${dbConfig.HOST}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    roleInitiate();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// Setup server port
var port = process.env.PORT || 3001;

// Send message for default URL
app.get("/", (req, res) => res.send("You are not authorized"));

// Use Api routes in the App
app.use("/api", apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running RestAPI on port " + port);
});
