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
      state.users = null;
      state.token = null;
      state.isAuthenticated = false;
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

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (satte, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registerSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // GET PROFILE
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearAuthError, resetRegisterSuccess } =
  authSlice.actions;

  export default authSlice.reducer;
