import { generateAIResponse } from "../services/aiService.js";

export const generateTaskWithAI = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await generateAIResponse(prompt);

    return res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      data: {
        response: aiResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};
