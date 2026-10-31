import api from "../api/axios";

export const generateTaskService = async (prompt) => {
  const response = await api.post("/ai/generate-task", { prompt });
  return response.data;
};