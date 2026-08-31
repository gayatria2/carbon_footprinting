const db = require("../config/db");
const bcrypt = require("bcrypt");

// =====================================================
// GET PROFILE
// =====================================================

const getProfile = (req, res) => {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id"
        });
    }

    const query = `
        SELECT
            u.id,
            u.full_name,
            u.email,
            u.sustainability_preference,
            u.created_at,

            COUNT(a.id) AS totalActivities,

            IFNULL(
                SUM(a.carbon_emission),
                0
            ) AS totalCarbon

        FROM users u

        LEFT JOIN activity a
            ON u.id = a.user_id

        WHERE u.id = ?

        GROUP BY
            u.id,
            u.full_name,
            u.email,
            u.sustainability_preference,
            u.created_at
    `;

    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Get Profile Error:", err);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const user = result[0];

        const totalActivities =
            Number(user.totalActivities) || 0;

        const totalCarbon =
            Number(user.totalCarbon) || 0;

        const averageCarbon =
            totalActivities > 0
                ? totalCarbon / totalActivities
                : 0;

        return res.status(200).json({
            success: true,

            data: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                sustainability_preference:
                    user.sustainability_preference || "",
                created_at: user.created_at,

                totalActivities,
                totalCarbon,
                averageCarbon
            }
        });
    });
};


// =====================================================
// UPDATE PROFILE
// =====================================================

const updateProfile = (req, res) => {
    const userId = Number(req.params.id);

    const {
        full_name,
        sustainability_preference
    } = req.body;

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id"
        });
    }

    if (!full_name || !full_name.trim()) {
        return res.status(400).json({
            success: false,
            message: "Full name is required"
        });
    }

    const query = `
        UPDATE users
        SET
            full_name = ?,
            sustainability_preference = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [
            full_name.trim(),
            sustainability_preference || null,
            userId
        ],
        (err, result) => {

            if (err) {
                console.error(
                    "Update Profile Error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                success: true,
                message:
                    "Profile updated successfully"
            });
        }
    );
};


// =====================================================
// CHANGE PASSWORD
// =====================================================

const changePassword = (req, res) => {
    const userId = Number(req.params.id);

    const {
        currentPassword,
        newPassword
    } = req.body;

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id"
        });
    }

    if (!currentPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            message:
                "Current password and new password are required"
        });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({
            success: false,
            message:
                "New password must be at least 6 characters"
        });
    }

    const getPasswordQuery = `
        SELECT password
        FROM users
        WHERE id = ?
    `;

    db.query(
        getPasswordQuery,
        [userId],
        async (err, result) => {

            if (err) {
                console.error(
                    "Get Password Error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            try {

                const isMatch =
                    await bcrypt.compare(
                        currentPassword,
                        result[0].password
                    );

                if (!isMatch) {
                    return res.status(400).json({
                        success: false,
                        message:
                            "Current password is incorrect"
                    });
                }

                const hashedPassword =
                    await bcrypt.hash(
                        newPassword,
                        10
                    );

                const updateQuery = `
                    UPDATE users
                    SET password = ?
                    WHERE id = ?
                `;

                db.query(
                    updateQuery,
                    [
                        hashedPassword,
                        userId
                    ],
                    (updateErr) => {

                        if (updateErr) {
                            console.error(
                                "Password Update Error:",
                                updateErr
                            );

                            return res.status(500).json({
                                success: false,
                                message:
                                    updateErr.message
                            });
                        }

                        return res.status(200).json({
                            success: true,
                            message:
                                "Password changed successfully"
                        });
                    }
                );

            } catch (error) {

                console.error(
                    "Password Error:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        }
    );
};


module.exports = {
    getProfile,
    updateProfile,
    changePassword
};