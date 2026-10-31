import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";
import tasksReducer from "./slices/tasksSlice";
import aiReducer from "./slices/aiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    tasks: tasksReducer,
    // New AI reducer
    ai: aiReducer,
  },
});
