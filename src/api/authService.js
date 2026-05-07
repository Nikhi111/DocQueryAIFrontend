import api from "./axios";

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/auth/login", loginData);

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};