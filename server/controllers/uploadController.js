const fs = require("fs");
const pdfParse = require("pdf-parse");
const ai = require("../config/gemini");

const uploadPDF = async (req, res) => {
  try {
    console.log("===== STEP 1 =====");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    }

    console.log("===== STEP 2 =====");
    console.log(req.file);

    const dataBuffer = fs.readFileSync(req.file.path);

    console.log("===== STEP 3 =====");

    const pdfData = await pdfParse(dataBuffer);

    console.log("===== STEP 4 =====");
    console.log(pdfData.text.substring(0, 100));

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: `Summarize the following study material in simple language:

${pdfData.text}`,
    });

    console.log("===== STEP 5 =====");
    console.log(response.text);

    res.status(200).json({
      success: true,
      message: "PDF uploaded and summarized successfully",
      summary: response.text,
    });

  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error generating summary",
    });
  }
};

module.exports = {
  uploadPDF,
};