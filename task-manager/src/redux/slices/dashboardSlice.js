import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardOverview } from "../thunks/dashboardThunks";

const initialState = {
    stats: null,
    recentTasks: [],
    upcomingTasks: [],
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,

    reducers: {
        clearDashboardError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardOverview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchDashboardOverview.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                // API response se data lena
                state.stats = action.payload.stats ?? action.payload ?? {};

                state.recentTasks = action.payload.recentTasks ?? [];
                state.upcomingTasks = action.payload.upcomingTasks ?? [];
            })

            .addCase(fetchDashboardOverview.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Unable to fetch dashboard data";
            });
    },
});

export const { clearDashboardError } = dashboardSlice.actions;

export default dashboardSlice.reducer;