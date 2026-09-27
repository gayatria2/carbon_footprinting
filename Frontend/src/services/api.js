import axios from "axios";

const api = axios.create({
  baseURL: "https://carbon-footprinting-eaxv.onrender.com/api",
});

export default api;