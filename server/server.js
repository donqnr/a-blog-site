const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("./passport/setup");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config.env" });

const auth = require("./routes/auth");
const blogposts = require("./routes/post");

const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(console.log(`Connected to MongoDB`))
  .catch(err => console.log(err));


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,

  // -- I was going to store sessions with mongostore,
  // -- but in deployment it kept rejecting the cookies as third-party,
  // -- which couldn't be fixed no matter what I did. shit's fucked

  //cookie: { maxAge: 5 * 60000,
    //httpOnly: true,
    //domain: process.env.COOKIE_DOMAIN,
    //sameSite: 'none'},
  //store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(cookieParser(process.env.SECRET));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", auth);
app.use("/", blogposts);

app.get("/", (req, res) => res.send("e"));
app.listen(port, () => console.log(
  `Listening on port ${port}!`
));