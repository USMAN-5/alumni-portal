const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
  name: String,
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  batch: String,
  company: String,
  position: String,
  email: String,
}, { timestamps: true });

module.exports = mongoose.model("Alumni", alumniSchema);
