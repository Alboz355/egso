import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Find EGSO Sàrl in Geneva, Switzerland. What is their address, phone number, and website?",
    config: {
      tools: [{ googleMaps: {} }],
    },
  });
  console.log(response.text);
  console.log(JSON.stringify(response.candidates?.[0]?.groundingMetadata?.groundingChunks, null, 2));
}

run();
