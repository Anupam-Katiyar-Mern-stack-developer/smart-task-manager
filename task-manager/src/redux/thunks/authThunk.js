import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  loginService,
  registerService,
  getProfileService,
} from "../../services/auth.service";

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || "something went  wrong";

// login user 
export const loginUser = createAsyncThunk(
  "auth/login",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await loginService(FormData);
      const token = response.token ?? response.data?.token;
      if (!token) {
        return rejectWithValue("Login response does not contain a token");
      }
      localStorage.setItem("token", token);

      return {
        token,
        user: response.user ?? response.data?.user ?? null,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (FormData, { rejectWithValue }) => {
    try {
      return await registerService(formData);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// get profile
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfileService();
      return response.data ?? response.user ?? response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);
