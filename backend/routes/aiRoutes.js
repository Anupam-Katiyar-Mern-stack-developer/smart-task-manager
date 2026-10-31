import express from "express";

import { generateTaskWithAI } from "../controllers/aiController.js";
import { validateTaskPrompt } from "../validators/aiValidator.js";

// Apne existing auth middleware ka correct path use karna
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/generate-task",
  verifyToken,
  validateTaskPrompt,
  generateTaskWithAI
);

export default router;