import axios from "axios";

// =====================================================
// ADMIN API BASE URL
// =====================================================

const ADMIN_API =
    "http://localhost:5000/api/admin/auth";


// =====================================================
// ADMIN LOGIN
// =====================================================

export const adminLogin = async (adminData) => {

    return await axios.post(
        `${ADMIN_API}/login`,
        adminData
    );

};