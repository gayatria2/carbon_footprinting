import axios from " axios";


// =====================================================
// ADMIN DASHBOARD API
// =====================================================

const ADMIN_API =
    // "http://localhost:5000/api/admin/dashboard"
    
    "https://carbon-footprinting-eaxv.onrender.com";


// =====================================================
// GET ADMIN DASHBOARD
// =====================================================

export const getAdminDashboard = async () => {

    return await axios.get(
        ADMIN_API
    );

};