import axios from "axios";

const ADMIN_API =
  // "http://localhost:5000/api/admin/leaderboard"
  
  "https://carbon-footprinting-eaxv.onrender.com";


const getAuthHeaders = () => {

  const token =
    localStorage.getItem(
      "adminToken"
    );

  return {

    headers: {
      Authorization: `Bearer ${token}`,
    },

  };

};


// =====================================================
// GET LEADERBOARD
// =====================================================

export const getAdminLeaderboard =
  async () => {

    return await axios.get(
      ADMIN_API,
      getAuthHeaders()
    );

  };


// =====================================================
// GET SUMMARY
// =====================================================

export const getAdminLeaderboardSummary =
  async () => {

    return await axios.get(
      `${ADMIN_API}/summary`,
      getAuthHeaders()
    );

  };