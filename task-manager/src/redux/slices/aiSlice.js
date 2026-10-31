import { createSlice } from "@reduxjs/toolkit";
import { generateTaskWithAI } from "../thunks/aiThunk";

const initialState = {
  generatedTask: null,
  loading: false,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,

  reducers: {
    clearGeneratedTask: (state) => {
      state.generatedTask = null;
      state.error = null;
    },
    clearAIError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(generateTaskWithAI.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.generatedTask = null;
      })

      .addCase(generateTaskWithAI.fulfilled, (state, action) => {
        state.loading = false;
        state.generatedTask = action.payload.response;
      })

      .addCase(generateTaskWithAI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Task generation failed";
      });
  },
});

export const { clearGeneratedTask, clearAIError } = aiSlice.actions;

export default aiSlice.reducer;
