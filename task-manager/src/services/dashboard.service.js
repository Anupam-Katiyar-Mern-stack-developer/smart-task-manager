import api from "../api/axios";

export const getDashboardOverviewService = async () => {
  const response = await api.get("/tasks/user/dashboard");
  console.log(response)
  return response.data;
};