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

module.exports = router;
