import { GoogleGenAI } from "@google/genai";

// As per guidelines, the API key is handled by the environment.
// This instance can be imported and used by other services.
export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
