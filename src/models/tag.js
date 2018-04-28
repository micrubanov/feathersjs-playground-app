const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});


var Tag = mongoose.model("Tag", schema);

module.exports = Tag;
