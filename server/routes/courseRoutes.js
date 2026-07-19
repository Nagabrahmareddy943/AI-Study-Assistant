const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getUserCourses,
  getCourseById,
} = require("../controllers/courseController");

// Get all courses of logged-in user
router.get("/", authMiddleware, getUserCourses);

// Get single course by ID
router.get("/:id", authMiddleware, getCourseById);

module.exports = router;