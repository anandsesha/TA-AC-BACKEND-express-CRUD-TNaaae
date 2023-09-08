const express = require("express");
var app = express();
const mongoose = require("mongoose");
const path = require("path");
const { nextTick } = require("process");

var Schema = mongoose.Schema;

mongoose
  .connect("mongodb://127.0.0.1:27017/school")
  .then(() => console.log(`Connected DB`))
  .catch((err) => console.log(err));

// Set the views engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Middleware to convert req into json and store in req.body
app.use(express.json());

//Middleware to convert Form data req into json and store in req.body
app.use(express.urlencoded({ extended: false }));

// Using res.locals to pass some message
app.use((req, res, next) => {
  res.locals.message = "Hello locals";
  next();
});

var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");
app.use("/", indexRouter);
app.use("/users", userRouter);

app.use((req, res, next) => {
  res.send(`This route has not been handled yet on server end!!`);
});

app.listen(3000, () => {
  console.log(`Server listening at port 3000`);
});
