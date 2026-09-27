import axios from " axios";

const API_URL =
    // "http://localhost:5000/api/profile"
    "https://carbon-footprinting-eaxv.onrender.com";


// =====================================================
// GET PROFILE
// =====================================================

export const getProfile = (userId) => {
    return axios.get(
        `${API_URL}/${userId}`
    );
};


// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = (
    userId,
    profileData
) => {
    return axios.put(
        `${API_URL}/${userId}`,
        profileData
    );
};


// =====================================================
// CHANGE PASSWORD
// =====================================================

export const changePassword = (
    userId,
    passwordData
) => {
    return axios.put(
        `${API_URL}/${userId}/password`,
        passwordData
    );
};