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
  name: 'asdf.sid',
  secret: process.env.SECRET,
  httpOnly: true,
  secure: true,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 19 * 60000,
           domain: process.env.CORS_ORIGIN,
          sameSite: 'lax'},
  store: new MongoStore({ mongooseConnection: mongoose.connection,
        clear_interval: 3600 })
}));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", auth);
app.use("/", blogposts);

app.get("/", (req, res) => res.send("e"));
app.listen(port, () => console.log(
  `Listening on port ${port}!`
));