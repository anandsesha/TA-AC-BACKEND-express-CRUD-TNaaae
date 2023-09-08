var express = require('express');
var router = express.Router();
var School = require('../models/student');

// Routes specific to /Student kept here

// Create a Student Form
router.get('/new', (req, res) => {
  //   var students = [
  //     { name: 'Anand', class: 10 },
  //     { name: 'Arvind', class: 7 },
  //   ];
  //   res.render('index', { students: students });
  res.send(`Here is the data you need for the Student Form`);
});

// Create a Student
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    var student = await School.create(req.body);
    res.send(student);
  } catch (err) {
    next('Error inserting data in MongoDB');
  }
});

// Get all students list
router.get('/all', async (req, res) => {
  var allStudents = await School.find({});
  res.send(allStudents);
});

// Get single student details
router.get('/:id', async (req, res) => {
  var oneStudent = await School.findById(req.params.id);
  console.log(oneStudent);
  res.render('student', { student: oneStudent });
});

module.exports = router;
