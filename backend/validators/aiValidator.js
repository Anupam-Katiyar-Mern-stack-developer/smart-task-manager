import { success } from "zod";

export const validateTaskPrompt = (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const trimmedPrompt = prompt.trim();

    if (trimmedPrompt.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Prompt must be at least 5 characters long",
      });
    }

    if (trimmedPrompt.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Prompt cannot exceed 1000 characters",
      });
    }

    req.body.prompt = trimmedPrompt;
    next();
  } catch (error) {
    next(error);
  }
};
