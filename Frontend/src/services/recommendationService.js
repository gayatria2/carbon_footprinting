import axios from "axios";

const API_URL = 
// "http://localhost:5000/api/recommendations"
"https://carbon-footprinting-eaxv.onrender.com";

// =====================================================
// GET USER RECOMMENDATIONS
// =====================================================

export const getRecommendations = (userId) => {
  return axios.get(`${API_URL}/${userId}`);
};