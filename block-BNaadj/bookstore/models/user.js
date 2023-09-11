var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  uname: { type: String, required: true },
  uage: Number,
  uemail: String,
  ubio: String,
});

var User = mongoose.model('User', userSchema);

module.exports = User;
