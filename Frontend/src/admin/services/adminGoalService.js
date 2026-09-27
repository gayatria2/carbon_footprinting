import axios from " axios";

const ADMIN_API =
  // "http://localhost:5000/api/admin/goals"
  
  "https://carbon-footprinting-eaxv.onrender.com";

const getAuthHeaders = () => {
  const token =
    localStorage.getItem("adminToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


// GET ALL GOALS
export const getAdminGoals = async () => {
  return await axios.get(
    ADMIN_API,
    getAuthHeaders()
  );
};


// GET SINGLE GOAL
export const getAdminGoalById = async (id) => {
  return await axios.get(
    `${ADMIN_API}/${id}`,
    getAuthHeaders()
  );
};


// DELETE GOAL
export const deleteAdminGoal = async (id) => {
  return await axios.delete(
    `${ADMIN_API}/${id}`,
    getAuthHeaders()
  );
};