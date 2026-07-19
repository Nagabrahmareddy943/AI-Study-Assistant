const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const { uploadPDF } = require("../controllers/uploadController");

const authMiddleware = require("../middleware/authMiddleware");


router.post(
  "/",
  authMiddleware,
  upload.single("pdf"),
  uploadPDF
);


module.exports = router;