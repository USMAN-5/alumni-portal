const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "alumni", "admin"], default: "student" },
  rollNumber: { 
    type: String, 
    required: function() {
      return this.role === "student" || this.role === "alumni";
    },
    unique: true,
    sparse: true
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
