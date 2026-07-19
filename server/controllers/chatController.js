const ai = require("../config/gemini");
const Course = require("../models/Course");

const chatWithCourse = async (req, res) => {
  try {
    const { courseId, question } = req.body;

    if (!courseId || !question) {
      return res.status(400).json({
        success: false,
        message: "Course ID and question are required",
      });
    }

    const course = await Course.findOne({
      _id: courseId,
      user: req.user.id,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: `
You are an AI tutor.

Answer the user's question using ONLY the following course content.

Course Content:
${course.content}

Question:
${question}
      `,
    });

    res.status(200).json({
      success: true,
      answer: response.text,
    });
  } catch (error) {
    console.error(error);
    console.log(req.body);

    res.status(500).json({
      success: false,
      message: "Error generating AI response",
    });
  }
};

module.exports = {
  chatWithCourse,
};