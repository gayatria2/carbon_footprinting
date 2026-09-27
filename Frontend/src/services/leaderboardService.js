import axios from " axios";

const API_URL =
    // "http://localhost:5000/api/leaderboard"
   "https://carbon-footprinting-eaxv.onrender.com" ;
   

// =====================================================
// GET LEADERBOARD
// =====================================================

export const getLeaderboard = (userId) => {
    return axios.get(
        `${API_URL}/${userId}`
    );
};