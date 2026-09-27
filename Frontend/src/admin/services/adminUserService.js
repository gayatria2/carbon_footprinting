import axios from "axios";


// =====================================================
// ADMIN USERS API
// =====================================================

const ADMIN_API =
    // "http://localhost:5000/api/admin/users"

    "https://carbon-footprinting-eaxv.onrender.com"
    ;


// =====================================================
// GET ALL USERS
// =====================================================

export const getAdminUsers = async () => {

    return await axios.get(
        ADMIN_API
    );

};


// =====================================================
// GET SINGLE USER
// =====================================================

export const getAdminUserById = async (id) => {

    return await axios.get(
        `${ADMIN_API}/${id}`
    );

};


// =====================================================
// DELETE USER
// =====================================================

export const deleteAdminUser = async (id) => {

    return await axios.delete(
        `${ADMIN_API}/${id}`
    );

};