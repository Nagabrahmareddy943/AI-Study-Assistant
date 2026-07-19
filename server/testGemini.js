require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Say hello",
    });

    console.log(response.text);
  } catch (error) {
    console.log("ERROR:");
    console.log(error.message);
  }
}

test();