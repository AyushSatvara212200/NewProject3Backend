require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require('body-parser');
// const pdf = require('html-pdf');
const passport = require("passport");

//=== 1 - CREATE APP
// Creating express app and configuring middleware needed for authentication
const app = express();

//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());

// view engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.disable("etag");

// Setting up port
const connUri = process.env.MONGO_LOCAL_CONN_URL;
let PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

console.log("here");

//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.connect(connUri, { useNewUrlParser: true });
// useCreateIndex: true

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB --  database connection established successfully!")
);
connection.on("error", (err) => {
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running. " + err
  );
  process.exit();
});

require("./src/middlewares/jwt")(passport);

//=== 4 - CONFIGURE ROUTES
//Configure Route
require("./src/routes/index")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

//=== 5 - START SERVER
app.listen(PORT, () =>
  console.log("Server listening on http://localhost:" + PORT + "/")
);
