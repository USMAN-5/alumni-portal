const express = require("express");
const { getAlumni, createAlumni } = require("../controllers/alumniController");
const router = express.Router();

router.get("/", getAlumni);
router.post("/", createAlumni);

module.exports = router;
