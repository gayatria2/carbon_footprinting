import api from "./api ";


// =====================================================
// GET
// =====================================================

export const getSettings = async (
    userId
) => {

    return await api.get(
        `/settings/${userId}`
    );

};


// =====================================================
// UPDATE
// =====================================================

export const updateSettings = async (
    userId,
    settingsData
) => {

    return await api.put(
        `/settings/${userId}`,
        settingsData
    );

};


// =====================================================
// RESET
// =====================================================

export const resetSettings = async (
    userId
) => {

    return await api.put(
        `/settings/${userId}/reset`
    );

};