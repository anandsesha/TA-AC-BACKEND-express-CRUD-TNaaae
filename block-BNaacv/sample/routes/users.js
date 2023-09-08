const { route } = require(".");
var User = require("../models/user");
var express = require("express");
var router = express.Router();

//new user form -  GET '/users/new' => render `userForm.ejs` template
router.get("/new", (req, res) => {
  res.render("userForm");
});

// based on the form data coming from above , we create user in DB
router.post("/", async (req, res) => {
  console.log(req.body);
  var newUser = await User.create(req.body);
  res.render("createdUserAck", { newUser });
});

// list users present in MongoDB, in the browser. render `users.ejs` template with list of users
router.get("/", async (req, res) => {
  var usersList = await User.find({});
  console.log(usersList);
  res.render("users", { usersList });
});

// Get single user details present in MongoDB, and show in the browser. render `singeUser.ejs` template with single user object
router.get("/:id", async (req, res) => {
  var id = req.params.id;
  var singleUser = await User.findById(id);
  console.log(singleUser);
  res.render("singleUser", { singleUser });
});

module.exports = router;
