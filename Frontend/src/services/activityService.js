import axios from "axios";

// const API = "http://localhost:5000/api/auth";

const API = "https://carbon-footprinting-eaxv.onrender.com";


export const addActivity = (data) => {
  return axios.post(`${API}/add`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getActivities = () => {
  return axios.get(`${API}/list`);
};

export const deleteActivity = (id) => {
  return axios.delete(`${API}/delete/${id}`);
};

export const updateActivity = (id, data) => {
  return axios.put(`${API}/update/${id}`, data);
};