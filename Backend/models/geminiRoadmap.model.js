import mongoose from "mongoose";

const geminiRoadmapSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        domain: {
            type: String,
            required: true
        },
        normalizedDomain: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        roadmap: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        }
    },
    { timestamps: true }
);

geminiRoadmapSchema.index({ userId: 1, normalizedDomain: 1, createdAt: -1 });

export const GeminiRoadmap = mongoose.model("GeminiRoadmap", geminiRoadmapSchema);
