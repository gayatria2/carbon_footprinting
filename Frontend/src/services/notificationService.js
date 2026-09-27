import axios from "axios";

const API_URL = 
// """http://localhost:5000/api/notifications"
"https://carbon-footprinting-eaxv.onrender.com";

// Get all notifications
export const getNotifications = (userId) => {
  return axios.get(`${API_URL}/${userId}`);
};

// Get unread count
export const getUnreadCount = (userId) => {
  return axios.get(`${API_URL}/${userId}/unread-count`);
};

// Mark one as read
export const markNotificationAsRead = (id) => {
  return axios.put(`${API_URL}/read/${id}`);
};

// Mark all as read
export const markAllNotificationsAsRead = (userId) => {
  return axios.put(`${API_URL}/read-all/${userId}`);
};