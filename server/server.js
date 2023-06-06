// Script to start the backend server

// Import dependencies
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("./passport/setup");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config.env" });

// Import routes
const auth = require("./routes/auth");
const blogposts = require("./routes/post");
const users = require("./routes/user");

// Import stuff from .env file
const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

// Inititalize express and CORS
const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  exposedHeaders: ['Page-Amount','Cookie']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1);

// Get connection to MongoDB via mongoose
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(console.log(`Connected to MongoDB`))
  .catch(err => console.log(err));

app.use(cookieParser());


// Register routes
app.use("/api/auth", auth);
app.use("/api/blogposts", blogposts);
app.use("/api/users", users);

app.get("/", (req, res) => res.send("e"));
app.listen(port, () => console.log(
  `Listening on port ${port}!`
));