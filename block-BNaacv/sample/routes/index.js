// var User = require('../models/user');
var express = require('express');
var router = express.Router();

// For GENERAL routes - handled in index.js
router.get('/', (req, res) => {
  res.send(`You are in index route GENERAL`);
});

module.exports = router;
