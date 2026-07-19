const Course = require("../models/Course");

const getUserCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching courses",
    });
  }
};

module.exports = {
  getUserCourses,
};