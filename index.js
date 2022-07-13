// Import express
let express = require("express");
// Import Body parser
let bodyParser = require("body-parser");
// Initialise the app
let app = express();
const cors = require("cors");

// Import routes
let apiRoutes = require("./src/router");

const db = require("./src/model");
const dbConfig = require("./src/config/db.config");
const roleInitiate = require("./src/utils/roleInitiate");

var corsOptions = {
  origin: "http://localhost:3000",
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
  .connect(`mongodb://${dbConfig.HOST}/${dbConfig.DB}`, {
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
