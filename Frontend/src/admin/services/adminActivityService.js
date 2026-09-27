import axios from " axios";


// =====================================================
// ADMIN ACTIVITIES API
// =====================================================

const ADMIN_API =
    // "http://localhost:5000/api/admin/activities"
    "https://carbon-footprinting-eaxv.onrender.com"
    ;


// =====================================================
// GET ALL ACTIVITIES
// =====================================================

export const getAdminActivities = async () => {

    return await axios.get(
        ADMIN_API
    );

};


// =====================================================
// GET SINGLE ACTIVITY
// =====================================================

export const getAdminActivityById = async (
    id
) => {

    return await axios.get(
        `${ADMIN_API}/${id}`
    );

};


// =====================================================
// DELETE ACTIVITY
// =====================================================

export const deleteAdminActivity = async (
    id
) => {

    return await axios.delete(
        `${ADMIN_API}/${id}`
    );

};