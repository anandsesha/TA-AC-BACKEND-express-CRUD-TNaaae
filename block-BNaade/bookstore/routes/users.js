var User = require('../models/user');
var express = require('express');
var router = express.Router();

//Send user information from html form which can be requested by doing GET request on "/users/new"
router.get('/new', (req, res) => {
  res.render('userForm');
});

//add a POST request on "/users" in user router to handle form data.
router.post('/', async (req, res, next) => {
  try {
    //capture incoming req data
    console.log(req.body);
    // store in DB
    var newUser = await User.create(req.body);
    //send res back
    res.redirect('/');
  } catch (err) {
    // next('Error storing form data in DB');
    res.redirect('/users/new');
  }
});

/* -------------  1. Display List of users on a template ------------- */
router.get('/', async (req, res, next) => {
  try {
    var allUsersArray = await User.find(); // [{...},{...},{...}]
    res.render('users', { allUsersArray });
  } catch (err) {
    res.redirect('/users/new');
    next('Cannot get all users');
  }
});

/* -------------  2. Display single user ------------- */
router.get('/:id', async (req, res, next) => {
  try {
    var id = req.params.id;
    var singleUserObj = await User.findById(id);
    console.log(singleUserObj); // {...}
    res.render('singleUser', { singleUserObj });
  } catch (err) {
    next('Cant fetch single Book');
  }
});

/* ---------- Update (EDIT) user via form -------------*/
router.get('/:userid/edit', async (req, res, next) => {
  var id = req.params.userid;
  var oneUser = await User.findById(id);
  res.render('editUserForm', { oneUser });
});

//Edit user button clicked. Now have to save edited to DB
router.post('/:id', async (req, res, next) => {
  try {
    var id = req.params.id;
    var updatedUser = await User.findByIdAndUpdate(id, req.body); //the 2 parms are :- (id to update, the data coming from Edit user page which has to be updated with)
    res.redirect('/users');
  } catch (err) {
    next('Edited User not saved in DB');
  }
});

module.exports = router;
