const express = require("express");
const router = express.Router();
const { getMentorshipSuggestions } = require("../controllers/mentorshipController");
const authMiddleware = require("../middleware/authMiddleware");

// Protect all mentorship routes
router.use(authMiddleware);

// Get mentorship suggestions for logged-in student
router.get("/suggestions", getMentorshipSuggestions);

module.exports = router;