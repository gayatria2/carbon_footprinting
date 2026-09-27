import api from "./api ";
export const loginUser = async (userData) => {
  return await api.post("/auth/login", userData);
};

export const registerUser = async (userData) => {
  return await api.post("/auth/register", userData);
};

export const googleLogin = async (credential) => {
  return await api.post("/auth/google", {
    credential,
  });
};