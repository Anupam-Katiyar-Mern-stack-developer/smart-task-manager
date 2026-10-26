import api from "../api/axios";

export const getTasksService = async (params = {}) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== "" && value !== null && value !== undefined,
    ),
  );

  const response = await api.get("/tasks", {
    params: cleanParams,
  });

  return response.data;
};

export const createTaskService = async (taskData) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

export const updateTaskService = async (taskId, updates) => {
  const response = await api.patch(`/tasks/${taskId}`, updates);
  return response.data;
};

export const deleteTaskService = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};
