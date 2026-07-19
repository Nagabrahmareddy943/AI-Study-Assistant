const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const { uploadPDF } = require("../controllers/uploadController");

router.post("/", upload.single("pdf"), uploadPDF);

module.exports = router;