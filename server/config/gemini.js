require("dotenv").config();

console.log("KEY START:", process.env.GEMINI_API_KEY?.substring(0, 12));
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

module.exports = ai;