import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardOverviewService } from "../../services/dashboard.service";

export const fetchDashboardOverview = createAsyncThunk(
  "dashboard/fetchOverview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDashboardOverviewService();

      if (response?.success === false) {
        return rejectWithValue(response.message || "Failed to load dashboard");
      }
       console.log(response.data)
      // Expected API shape: { success: true, data: { stats, recentTasks, upcomingTasks } }
      return response.data ?? response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to load dashboard",
      );
    }
  },
);
