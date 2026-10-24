import api from "../api/axios";

export const loginService = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const registerService = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const getProfileService = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
