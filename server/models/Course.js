const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);