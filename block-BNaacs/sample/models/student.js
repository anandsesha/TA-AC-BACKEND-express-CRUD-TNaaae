var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var studentSchema = new Schema({
  name: { type: String, required: true },
  class: { type: Number, minlength: 1, maxlength: 10 },
});

var School = mongoose.model('School', studentSchema);

module.exports = School;
