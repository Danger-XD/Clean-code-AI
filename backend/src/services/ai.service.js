import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

export const aiService = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      systemInstruction: `You are an expert software engineer with over 10+ year experience. 
      Your task is to make minimal, non-intrusive improvements to the provided code in JavaScript. 
    Focus on applying clean code principles, fixing potential edge case issues, and ensuring the code is error-free and maintainable. 
    Do not rewrite the entire code—only enhance what's necessary.`,
    },
  });
  return response.text;
};
