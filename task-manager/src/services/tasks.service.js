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

  console.log(response);

  return response.data;
};

export const createTaskService = async (taskData) => {
  const response = await api.post("/tasks/create", taskData);
  return response.data;
};

export const updateTaskService = async (taskId, task) => {
  const response = await api.patch(`/tasks/${taskId}`, task);
  return response.data;
};

export const deleteTaskService = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/user/me");
  return response.data;
};
