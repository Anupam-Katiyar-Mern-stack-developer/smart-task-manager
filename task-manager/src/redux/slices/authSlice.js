
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, getProfile } from "../thunks/authThunk";

const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: false,
    error: null,
    registerSuccess: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            state.registerSuccess = false;
        },

        clearAuthError: (state) => {
            state.error = null;
        },

        resetRegisterSuccess: (state) => {
            state.registerSuccess = false;
        },
    },

    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || action.error.message || "Login failed";
            })

            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.registerSuccess = false;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.registerSuccess = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || action.error.message || "Registration failed";
            })

            // GET PROFILE
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || action.error.message || "Failed to fetch profile";
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                localStorage.removeItem("token");
            });
    },
});

export const { logout, clearAuthError, resetRegisterSuccess } = authSlice.actions;

export default authSlice.reducer;
