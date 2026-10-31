
import ai from "../config/ai.js";
import { z } from "zod";

const taskSchema = {
  type: "OBJECT",
  properties: {
    title: {
      type: "STRING",
    },
    description: {
      type: "STRING",
    },
    priority: {
      type: "STRING",
      enum: ["low", "medium", "high"],
    },
    dueDate: {
      type: "STRING",
      description: "Suggested date in YYYY-MM-DD format, or empty string if unknown.",
    },
    subtasks: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          description: { type: "STRING" },
          priority: {
            type: "STRING",
            enum: ["low", "medium", "high"],
          },
        },
        required: ["title", "description", "priority"],
      },
    },
  },
  required: ["title", "description", "priority", "dueDate", "subtasks"],
};

const generatedTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string(),
  subtasks: z.array(
    z.object({
      title: z.string().min(1).max(200),
      description: z.string(),
      priority: z.enum(["low", "medium", "high"]),
    }),
  ).max(10),
});

export const generateAIResponse = async (userPrompt) => {
  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: `
        You are an expert task management assistant.

        Generate one main task and up to 10 practical subtasks
        based on the user's request.

        Only suggest realistic priorities.
        Do not invent a specific deadline. If none is provided,
        return an empty dueDate.

        User request: ${userPrompt}
      `,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: taskSchema,
      },
    });

    const parsedResponse = JSON.parse(response.text);

    return generatedTaskSchema.parse(parsedResponse);
  } catch (error) {
    console.error("Gemini Task Generation Error:", error.message);
    throw new Error("Unable to generate task. Please try again.");
  }
};
