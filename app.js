const path = require("path");

const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const User = require("./models/user");
const bcryptjs = require("bcryptjs");
const dotEnv = require("dotenv")

//db
require("./config/db");

//load config
dotEnv.config({path: "./config/config.env"})

//passport
require("./config/passport");

//app
const app = express();

//midd
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//session
app.use(
  session({
    secret: "secret",
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    resave: false,
    saveUninitialized: false,
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//set view engine
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("layout", "./layouts/minLayout.ejs");
app.set("views", path.join(__dirname, "views"));

//routes
app.use("/", require("./routes/routes"));
app.use("/dashbord", require("./routes/dashbord"));

let port = 3000;
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`start`);
});
