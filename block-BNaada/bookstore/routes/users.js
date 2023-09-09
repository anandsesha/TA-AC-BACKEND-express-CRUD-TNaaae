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

module.exports = router;
