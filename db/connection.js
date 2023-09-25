//=============================================================================
// Mongo Atlas Connection
//=============================================================================
require("dotenv").config();
const mongoose = require("mongoose");

// Mongo URL and Connection
const mongoURI = process.env.DATABASE_URL;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI);

// Connection Error/Success - optional but can be helpful
// Define callback functions for various events
db.on("error", (err) =>
  console.log(err.message + " Looks like MongoDB is not running.")
);
db.on("connected", () => console.log("MongoDB is connected at: ", mongoURI));
db.on("disconnected", () => console.log("MongoDB database connection dropped"));

// Open the Connection
db.on("open", () => {
  console.log("✅ MongoDB connection successful!");
});

// now, our mongoose instance has a configured connection to our local db, in addition
// to its model configuration and can be exported to other files
module.exports = mongoose;
