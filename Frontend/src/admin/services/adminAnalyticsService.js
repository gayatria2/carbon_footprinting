import axios from "axios";

const ADMIN_API =
  // "http://localhost:5000/api/admin/analytics"
  
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


// Complete analytics
export const getAdminAnalytics = async () => {
  return await axios.get(
    ADMIN_API,
    getAuthHeaders()
  );
};


// Daily
export const getDailyCarbon = async () => {
  return await axios.get(
    `${ADMIN_API}/daily`,
    getAuthHeaders()
  );
};


// Weekly
export const getWeeklyCarbon = async () => {
  return await axios.get(
    `${ADMIN_API}/weekly`,
    getAuthHeaders()
  );
};


// Monthly
export const getMonthlyCarbon = async () => {
  return await axios.get(
    `${ADMIN_API}/monthly`,
    getAuthHeaders()
  );
};


// Category carbon
export const getCategoryCarbon = async () => {
  return await axios.get(
    `${ADMIN_API}/categories`,
    getAuthHeaders()
  );
};


// Activity count
export const getActivityCountByCategory =
  async () => {
    return await axios.get(
      `${ADMIN_API}/activity-count`,
      getAuthHeaders()
    );
  };


// Top users
export const getTopUsers = async () => {
  return await axios.get(
    `${ADMIN_API}/top-users`,
    getAuthHeaders()
  );
};