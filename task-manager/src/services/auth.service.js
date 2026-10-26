import api from "../api/axios";

export const loginService = async (data) => {
  const response = await api.post("/auth/user/login", data);
  return response.data;
};

export const registerService = async (data) => {
  const response = await api.post("/auth/user/register", data);
  return response.data;
};

export const getProfileService = async () => {
  const response = await api.get("/auth/user/me");
  return response.data;
};
