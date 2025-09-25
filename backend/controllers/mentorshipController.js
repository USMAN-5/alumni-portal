const User = require("../models/User");
const Alumni = require("../models/Alumni");

exports.getMentorshipSuggestions = async (req, res) => {
    try {
        // Get the current student's data
        const student = await User.findById(req.user.id);
        if (!student || student.role !== 'student') {
            return res.status(400).json({ message: "User is not a student" });
        }

        // Get all alumni data
        const alumni = await Alumni.find().select('-__v');

        // Get student's batch year from roll number (assuming format like 2025CS01)
        const studentBatchYear = parseInt(student.rollNumber.substring(0, 4));

        // Score and rank alumni based on various factors
        const rankedAlumni = alumni.map(alum => {
            let score = 0;
            
            // Parse alumni batch year
            const alumniBatchYear = parseInt(alum.batch);
            
            // Score based on batch year proximity (closer = higher score)
            const yearDiff = Math.abs(studentBatchYear - alumniBatchYear);
            score += (10 - yearDiff) * 2; // Max 20 points for year difference

            // Add more scoring factors here (e.g., same department, similar interests, etc.)
            
            return {
                ...alum.toObject(),
                matchScore: score
            };
        });

        // Sort by match score and get top 5
        const topMatches = rankedAlumni
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 5);

        res.json({
            student: {
                name: student.name,
                rollNumber: student.rollNumber
            },
            suggestedMentors: topMatches
        });

    } catch (error) {
        console.error("Error in getMentorshipSuggestions:", error);
        res.status(500).json({ message: "Error getting mentorship suggestions" });
    }
};