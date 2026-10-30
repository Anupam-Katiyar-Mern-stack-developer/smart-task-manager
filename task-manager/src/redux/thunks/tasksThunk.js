import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "../../services/tasks.service";

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

const getTaskFromResponse = (response) =>
  response?.data?.task ?? response?.data ?? response?.task ?? response;

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getTasksService(params);
      const payload = response?.data ?? response;

      const tasks = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.tasks)
          ? payload.tasks
          : Array.isArray(response?.tasks)
            ? response.tasks
            : [];

      const rawPagination = payload?.pagination ?? response?.pagination ?? {};

      const page = Number(rawPagination.page ?? params.page) || 1;
      const limit = Number(rawPagination.limit ?? params.limit) || 10;
      const total = Number(rawPagination.total ?? tasks.length) || 0;

      const totalPages =
        Number(rawPagination.totalPages ?? rawPagination.total_pages) ||
        Math.ceil(total / limit);

      return {
        tasks,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await createTaskService(taskData);
      return getTaskFromResponse(response);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, task }, thunkAPI) => {
    try {
      const response = await updateTaskService(taskId, task);

      return {
        taskId,
        task: response.task,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      await deleteTaskService(taskId);
      return taskId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);
