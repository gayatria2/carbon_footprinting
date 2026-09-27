import axios from "axios";

const ADMIN_API =
  // "http://localhost:5000/api/admin/emission-factors"
  
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


// GET ALL
export const getEmissionFactors = async () => {

  return await axios.get(
    ADMIN_API,
    getAuthHeaders()
  );

};


// CREATE
export const createEmissionFactor =
  async (data) => {

    return await axios.post(
      ADMIN_API,
      data,
      getAuthHeaders()
    );

  };


// UPDATE
export const updateEmissionFactor =
  async (id, data) => {

    return await axios.put(
      `${ADMIN_API}/${id}`,
      data,
      getAuthHeaders()
    );

  };


// DELETE
export const deleteEmissionFactor =
  async (id) => {

    return await axios.delete(
      `${ADMIN_API}/${id}`,
      getAuthHeaders()
    );

  };


// STATUS
export const toggleEmissionFactorStatus =
  async (id) => {

    return await axios.patch(
      `${ADMIN_API}/${id}/status`,
      {},
      getAuthHeaders()
    );

  };