import { createAsyncThunk } from "@reduxjs/toolkit";
import { generateTaskService } from "../../services/ai.service";

export const generateTaskWithAI = createAsyncThunk(
  "ai/generateTask",
  async (prompt, { rejectWithValue }) => {
    try {
      const response = await generateTaskService(prompt);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "AI task generation failed"
      );
    }
  }
);