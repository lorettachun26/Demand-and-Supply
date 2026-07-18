import express from "express";
import path from "express"; // standard path resolution
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini client utility
// Note: We use 'User-Agent': 'aistudio-build' for AI Studio telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});

// Full-stack health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// AI grading endpoint for HKDSE short answers
app.post("/api/grade-short-answer", async (req, res) => {
  try {
    const { questionId, studentAnswer, dseReference, questionText, maxMarks, modelAnswerKeywords } = req.body;

    if (!studentAnswer || studentAnswer.trim().length === 0) {
      return res.status(400).json({ error: "Student answer cannot be empty." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY environment variable is not configured. Please add it to your secrets panel."
      });
    }

    const prompt = `You are an expert official examiner for the HKDSE (Hong Kong Diploma of Secondary Education) Economics public examination.
We need you to evaluate a student's short-answer exam answer with high precision and provide a fair grade based on the official guidelines and curriculum guide.

QUESTION METADATA:
- HKDSE Reference: ${dseReference}
- Question Text: "${questionText}"
- Maximum Marks: ${maxMarks}
- Key Concept Keywords to look for: ${JSON.stringify(modelAnswerKeywords)}

STUDENT'S ANSWER:
"${studentAnswer}"

INSTRUCTIONS:
1. Award marks strictly out of ${maxMarks} based on the logical rigor and correct economic terminology.
2. Check if the student mentions the relevant keywords (e.g. substitutes/complements, increase/decrease in demand/supply, curve shifts, price changes, equilibrium adjustments).
3. Be fair. Give partial credit if they explain the logic correctly but miss minor details. If the student gets the final result right but has severe errors in the logic chain, deduct marks.
4. Provide structured, highly encouraging, constructive feedback containing:
   - score: integer out of ${maxMarks}
   - comments: brief overview of what they got right and wrong.
   - matchedKeywords: list of keywords they correctly integrated.
   - missingKeywords: list of important concepts they missed.
   - suggestions: clear advice on how they can improve their score next time to secure a Level 5** in the HKDSE exam.

You must respond with raw JSON matching this schema:
{
  "score": number,
  "maxMarks": number,
  "comments": string,
  "matchedKeywords": [string],
  "missingKeywords": [string],
  "suggestions": string
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["score", "maxMarks", "comments", "matchedKeywords", "missingKeywords", "suggestions"],
          properties: {
            score: { type: Type.INTEGER, description: "Earned score" },
            maxMarks: { type: Type.INTEGER, description: "Maximum possible score" },
            comments: { type: Type.STRING, description: "Constructive commentary" },
            matchedKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Integrated keywords"
            },
            missingKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Missed keywords"
            },
            suggestions: { type: Type.STRING, description: "Actionable DSE tips to reach Level 5**" }
          }
        }
      }
    });

    const resultText = response.text?.trim() || "{}";
    const resultJson = JSON.parse(resultText);

    return res.json(resultJson);
  } catch (error: any) {
    console.error("AI Grading Error:", error);
    return res.status(500).json({
      error: "Failed to perform AI evaluation. Ensure your Gemini API Key is correctly configured.",
      details: error.message
    });
  }
});

// Vite middleware integration for full-stack build configuration
const runServer = async () => {
  const { default: pathLib } = await import("path");
  
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = pathLib.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(pathLib.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HKDSE Economics Server listening at http://localhost:${PORT}`);
  });
};

runServer();
