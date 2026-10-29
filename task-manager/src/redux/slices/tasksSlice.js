import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../thunks/tasksThunk";

const initialState = {
  tasks: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  mutationLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    clearTasksError: (state) => {
      state.error = null;
    },

    resetTasks: (state) => {
      state.tasks = [];
      state.pagination = initialState.pagination;
      state.loading = false;
      state.mutationLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH TASKS
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tasks";
      })

      // CREATE TASK
      .addCase(createTask.pending, (state) => {
        state.mutationLoading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.mutationLoading = false;

        // Current page par duplicate insert nahi karna.
        const newTask = action.payload;

        if (
          newTask?.id &&
          !state.tasks.some((task) => task.id === newTask.id)
        ) {
          state.tasks.unshift(newTask);
          state.pagination.total += 1;
        }
      })
      .addCase(createTask.rejected, (state, action) => {
        state.mutationLoading = false;
        state.error = action.payload || "Failed to create task";
      })

      // UPDATE TASK
      .addCase(updateTask.pending, (state) => {
        state.mutationLoading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.mutationLoading = false;

        const { taskId, task } = action.payload;
        const index = state.tasks.findIndex(
          (item) => String(item.id) === String(taskId),
        );

        if (index !== -1 && task) {
          state.tasks[index] = { ...state.tasks[index], ...task };
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.mutationLoading = false;
        state.error = action.payload || "Failed to update task";
      })

      // DELETE TASK
      .addCase(deleteTask.pending, (state) => {
        state.mutationLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.mutationLoading = false;

        state.tasks = state.tasks.filter(
          (task) => String(task.id) !== String(action.payload),
        );

        state.pagination.total = Math.max(0, state.pagination.total - 1);

        state.pagination.totalPages = Math.ceil(
          state.pagination.total / state.pagination.limit,
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.mutationLoading = false;
        state.error = action.payload || "Failed to delete task";
      });
  },
});

export const { clearTasksError, resetTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
