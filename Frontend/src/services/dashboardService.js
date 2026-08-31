import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const getDashboard = (id) => {
    return axios.get(`${API}/dashboard/${id}`);
};