import api from "../api/axios";

export const getDashboardOverviewService = async () => {
  const response = await api.get("/dashboard/overview");
  return response.data;
};