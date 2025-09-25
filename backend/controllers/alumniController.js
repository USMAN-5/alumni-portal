const Alumni = require("../models/Alumni");

exports.getAlumni = async (req, res) => {
  const alumni = await Alumni.find();
  res.json(alumni);
};

exports.createAlumni = async (req, res) => {
  const alumni = new Alumni(req.body);
  await alumni.save();
  res.status(201).json(alumni);
};
