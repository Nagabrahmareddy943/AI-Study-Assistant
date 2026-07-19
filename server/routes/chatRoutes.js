const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { chatWithCourse } = require("../controllers/chatController");

router.post("/", authMiddleware, chatWithCourse);

module.exports = router;