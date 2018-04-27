const mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});


var Tag = mongoose.model("Tag", MessageSchema);

module.exports = Tag;
