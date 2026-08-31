import axios from "axios";

const API_URL = "http://localhost:5000/api/analytics";

export const getAnalytics = (userId) => {
  return axios.get(`${API_URL}/${userId}`);
};