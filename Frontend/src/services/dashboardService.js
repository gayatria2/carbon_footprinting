import axios from "axios";

// const API = "http://localhost:5000/api/auth";

const API = "https://carbon-footprinting-eaxv.onrender.com";


export const getDashboard = (id) => {
    return axios.get(`${API}/dashboard/${id}`);
};