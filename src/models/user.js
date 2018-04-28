const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String, required: true}
});


var User = mongoose.model("User", schema);

module.exports = User;
