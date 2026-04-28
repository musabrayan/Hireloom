import { GoogleGenAI } from "@google/genai";
import { GeminiRoadmap } from "../models/geminiRoadmap.model.js";

const buildRoadmapPrompt = (domain) => {
    return `Create a detailed 8-week learning roadmap for ${domain}. Return only JSON with structure:
{
  "domain": "${domain}",
  "weeks": [
    {
      "week": 1,
      "title": "Week 1 Title",
      "topics": ["Topic 1", "Topic 2"],
      "description": "Summary",
      "estimatedHours": "10-15 hours",
      "level": "beginner"
    }
  ]
}`;
};

const parseJsonResponse = (text) => {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error("Invalid response from Gemini");
    }
    return JSON.parse(jsonMatch[0]);
};

export const generateRoadmap = async (req, res) => {
    try {
        const { domain } = req.body;
        const userId = req.userId;

        if (!domain || typeof domain !== "string") {
            return res.status(400).json({
                success: false,
                message: "Domain is required."
            });
        }

        const normalizedDomain = domain.trim().toLowerCase();
        if (!normalizedDomain) {
            return res.status(400).json({
                success: false,
                message: "Domain is required."
            });
        }

        const cached = await GeminiRoadmap.findOne({ userId, normalizedDomain })
            .sort({ createdAt: -1 });

        if (cached) {
            return res.status(200).json({
                success: true,
                message: "Roadmap loaded from cache.",
                roadmap: cached.roadmap,
                cached: true
            });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({
                success: false,
                message: "Gemini API key is not configured."
            });
        }

        const ai = new GoogleGenAI({ apiKey });
        const prompt = buildRoadmapPrompt(domain.trim());

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        const text = response.text || "";
        const roadmap = parseJsonResponse(text);

        await GeminiRoadmap.create({
            userId,
            domain: domain.trim(),
            normalizedDomain,
            model: "gemini-2.5-flash",
            roadmap
        });

        return res.status(200).json({
            success: true,
            message: "Roadmap generated successfully.",
            roadmap,
            cached: false
        });
    } catch (error) {
        const status = error?.message?.includes("429") || error?.status === 429 ? 429 : 500;
        const message = status === 429
            ? "API rate limit exceeded. Please wait a minute and try again."
            : "Internal server error.";

        console.error("Error generating roadmap:", error?.message);
        return res.status(status).json({
            success: false,
            message
        });
    }
};
