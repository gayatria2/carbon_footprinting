const express = require("express");

const router = express.Router();

const {
    getNotifications,
    getUnreadCount,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification
} = require("../controllers/notificationController");

// Unread count
router.get(
    "/:userId/unread-count",
    getUnreadCount
);

// All notifications
router.get(
    "/:userId",
    getNotifications
);

// Create
router.post(
    "/",
    createNotification
);

// Mark one as read
router.put(
    "/read/:id",
    markAsRead
);

// Mark all as read
router.put(
    "/read-all/:userId",
    markAllAsRead
);

// Delete
router.delete(
    "/:id",
    deleteNotification
);

module.exports = router;