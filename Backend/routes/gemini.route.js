import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { generateRoadmap } from "../controllers/gemini.controller.js";

const router = express.Router();

router.route("/roadmap").post(isAuthenticated, generateRoadmap);

export default router;
