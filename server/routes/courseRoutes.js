const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getUserCourses } = require("../controllers/courseController");

// Get all courses for the logged-in user
router.get("/", authMiddleware, getUserCourses);

module.exports = router;