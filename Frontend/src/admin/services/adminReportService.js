import axios from "axios";

const ADMIN_API =
  // "http://localhost:5000/api/admin/reports"
  
  "https://carbon-footprinting-eaxv.onrender.com";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getCompleteReport = async () => {
  return await axios.get(
    ADMIN_API,
    getAuthHeaders()
  );
};

export const getOverallReport = async () => {
  return await axios.get(
    `${ADMIN_API}/overall`,
    getAuthHeaders()
  );
};

export const getCategoryReport = async () => {
  return await axios.get(
    `${ADMIN_API}/categories`,
    getAuthHeaders()
  );
};

export const getUserReport = async () => {
  return await axios.get(
    `${ADMIN_API}/users`,
    getAuthHeaders()
  );
};

export const getMonthlyReport = async () => {
  return await axios.get(
    `${ADMIN_API}/monthly`,
    getAuthHeaders()
  );
};

export const getDateRangeReport = async (
  startDate,
  endDate
) => {
  return await axios.get(
    `${ADMIN_API}/date-range`,
    {
      ...getAuthHeaders(),
      params: {
        startDate,
        endDate,
      },
    }
  );
};