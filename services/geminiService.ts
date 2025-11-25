import { GoogleGenAI, Type } from "@google/genai";
import { TypoSettings, AIAnalysisResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeTypography = async (settings: TypoSettings, textSample: string): Promise<AIAnalysisResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please provide a valid API_KEY in the environment.");
  }

  const model = "gemini-2.5-flash";
  
  const prompt = `
    Analyze the following typography settings for a web context:
    - Font Size: ${settings.fontSize}px
    - Letter Spacing: ${settings.letterSpacing}em
    - Line Height: ${settings.lineHeight}
    - Font Weight: ${settings.fontWeight}
    - Font Family Class: ${settings.fontFamily}
    
    Sample text context (first 100 chars): "${textSample.substring(0, 100)}..."

    Evaluate readability, accessibility, and aesthetic balance. 
    Provide a score out of 100, specific feedback points, and a general suggestion.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class UI/UX designer and typography expert. Your advice is concise, practical, and focuses on WCAG accessibility and visual harmony.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            readabilityScore: { type: Type.NUMBER, description: "Score from 0 to 100 indicating readability." },
            feedback: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 2-3 specific observations regarding the settings." 
            },
            suggestion: { type: Type.STRING, description: "One actionable improvement suggestion." }
          },
          required: ["readabilityScore", "feedback", "suggestion"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIAnalysisResult;
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
      readabilityScore: 0,
      feedback: ["Failed to analyze due to an error.", "Please check your API key or network connection."],
      suggestion: "Try adjusting settings manually based on visual comfort."
    };
  }
};