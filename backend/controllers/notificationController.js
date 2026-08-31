const db = require("../config/db");

// =====================================================
// GET ALL NOTIFICATIONS
// =====================================================

const getNotifications = (req, res) => {

    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id"
        });
    }

    const sql = `
        SELECT
            id,
            user_id,
            title,
            message,
            type,
            is_read,
            created_at
        FROM notifications
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {
            console.error("Get Notifications Error:", err);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            data: result
        });
    });
};


// =====================================================
// GET UNREAD COUNT
// =====================================================

const getUnreadCount = (req, res) => {

    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id"
        });
    }

    const sql = `
        SELECT COUNT(*) AS unreadCount
        FROM notifications
        WHERE user_id = ?
        AND is_read = 0
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {
            console.error("Unread Count Error:", err);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            unreadCount: Number(result[0].unreadCount) || 0
        });
    });
};


// =====================================================
// CREATE NOTIFICATION
// =====================================================

const createNotification = (req, res) => {

    const {
        user_id,
        title,
        message,
        type
    } = req.body;

    if (!user_id || !title || !message) {
        return res.status(400).json({
            success: false,
            message: "user_id, title and message are required"
        });
    }

    const sql = `
        INSERT INTO notifications
        (
            user_id,
            title,
            message,
            type
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            Number(user_id),
            title,
            message,
            type || "general"
        ],
        (err, result) => {

            if (err) {
                console.error("Create Notification Error:", err);

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Notification created successfully",
                notificationId: result.insertId
            });
        }
    );
};


// =====================================================
// MARK ONE AS READ
// =====================================================

const markAsRead = (req, res) => {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid notification id"
        });
    }

    const sql = `
        UPDATE notifications
        SET is_read = 1
        WHERE id = ?
    `;

    db.query(sql, [id], (err) => {

        if (err) {
            console.error("Mark Read Error:", err);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification marked as read"
        });
    });
};


// =====================================================
// MARK ALL AS READ
// =====================================================

const markAllAsRead = (req, res) => {

    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id"
        });
    }

    const sql = `
        UPDATE notifications
        SET is_read = 1
        WHERE user_id = ?
        AND is_read = 0
    `;

    db.query(sql, [userId], (err) => {

        if (err) {
            console.error("Mark All Read Error:", err);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "All notifications marked as read"
        });
    });
};


// =====================================================
// DELETE NOTIFICATION
// =====================================================

const deleteNotification = (req, res) => {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid notification id"
        });
    }

    const sql = `
        DELETE FROM notifications
        WHERE id = ?
    `;

    db.query(sql, [id], (err) => {

        if (err) {
            console.error("Delete Notification Error:", err);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully"
        });
    });
};


module.exports = {
    getNotifications,
    getUnreadCount,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification
};