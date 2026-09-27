import axios from " axios ";

// const API_URL = "http://localhost:5000/api/goals";

const API_URL = "https://carbon-footprinting-eaxv.onrender.com";


// ================= CREATE GOAL =================

export const createGoal = (goalData) => {
  return axios.post(API_URL, goalData);
};


// ================= GET USER GOAL =================

export const getGoal = (userId) => {
  return axios.get(`${API_URL}/${userId}`);
};


// ================= UPDATE GOAL =================

export const updateGoal = (goalId, goalData) => {
  return axios.put(
    `${API_URL}/${goalId}`,
    goalData
  );
};


// ================= DELETE GOAL =================

export const deleteGoal = (goalId) => {
  return axios.delete(
    `${API_URL}/${goalId}`
  );
};