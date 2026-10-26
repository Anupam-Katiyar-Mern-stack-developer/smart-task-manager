import api from "../api/axios";

export const getDashboardOverviewService = async () => {
  const response = await api.get("/tasks/user/dashboard");
  return response.data;
};