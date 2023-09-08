const express = require('express');
var app = express();
const mongoose = require('mongoose');
const path = require('path');
var School = require('./models/student');
const { nextTick } = require('process');

var Schema = mongoose.Schema;

mongoose
  .connect('mongodb://127.0.0.1:27017/school')
  .then(() => console.log(`Connected DB`))
  .catch((err) => console.log(err));

//Middleware to convert req into json and store in req.body
app.use(express.json());

// Set the views engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Using res.locals to pass some message
app.use((req, res, next) => {
  res.locals.message = 'Hello locals';
  next();
});

// Router Middleware 1 :-
// req has come where we render on to the webpage the index.ejs using res.render()
app.get('/', (req, res, next) => {
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
app.post('/', async (req, res, next) => {
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

app.listen(3000, () => {
  console.log(`Server listening at port 3000`);
});
