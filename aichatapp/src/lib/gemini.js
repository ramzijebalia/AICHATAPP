import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

console.log(process.env.REACT_APP_GEMINI_PUBLIC_KEY);
const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_PUBLIC_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings: safetySettings });


export default model;