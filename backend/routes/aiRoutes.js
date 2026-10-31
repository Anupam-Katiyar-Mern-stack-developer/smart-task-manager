import express from "express";

import { generateTaskWithAI } from "../controllers/aiController.js";
import { validateTaskPrompt } from "../validators/aiValidator.js";

// Apne existing auth middleware ka correct path use karna
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/generate-task",
  authMiddleware,
  validateTaskPrompt,
  generateTaskWithAI
);

export default router;