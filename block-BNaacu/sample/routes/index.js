var express = require('express');
var router = express.Router();
var School = require('../models/student');

// Common GENERAL Middlewares placed in index.js of routes/ folder

// Router Middleware 1 :-
// req has come where we render on to the webpage the index.ejs using res.render()
router.get('/', (req, res, next) => {
  try {
    var students = [
      { name: 'Anand', class: 10 },
      { name: 'Arvind', class: 7 },
    ];
    res.render('index', { students: students });
  } catch (err) {
    next(err);
  }
});

// Router Middleware 2:-
// Where we store (insert) data in MongoDB
router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    var student = await School.create(req.body);
    var students = [
      { name: 'Anand', class: 10 },
      { name: 'Arvind', class: 7 },
    ];
    res.render('index', { students: students });
  } catch (err) {
    next('Error inserting data in MongoDB');
  }
});

module.exports = router;
