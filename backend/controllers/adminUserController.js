const db = require("../config/db");

// =====================================================
// GET ALL USERS FOR ADMIN
// =====================================================

const getAdminUsers = (req, res) => {

    const sql = `
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

        GROUP BY
            u.id,
            u.full_name,
            u.email,
            u.sustainability_preference,
            u.created_at

        ORDER BY u.id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.error(
                "ADMIN USERS ERROR:",
                err
            );

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        });

    });

};


// =====================================================
// GET SINGLE USER DETAILS
// =====================================================

const getAdminUserById = (req, res) => {

    const { id } = req.params;

    const userQuery = `
        SELECT
            id,
            full_name,
            email,
            sustainability_preference,
            created_at

        FROM users
        WHERE id = ?
        LIMIT 1
    `;

    db.query(
        userQuery,
        [id],
        (err, userResult) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (userResult.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const user = userResult[0];

            const activityQuery = `
                SELECT
                    id,
                    activity_type,
                    transport_type,
                    distance,
                    electricity,
                    waste,
                    food,
                    carbon_emission,
                    activity_date

                FROM activity
                WHERE user_id = ?

                ORDER BY id DESC
            `;

            db.query(
                activityQuery,
                [id],
                (err, activityResult) => {

                    if (err) {

                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    const totalActivities =
                        activityResult.length;

                    const totalCarbon =
                        activityResult.reduce(
                            (sum, item) =>
                                sum +
                                Number(
                                    item.carbon_emission || 0
                                ),
                            0
                        );

                    return res.status(200).json({

                        success: true,

                        data: {

                            user,

                            totalActivities,

                            totalCarbon,

                            activities:
                                activityResult

                        }

                    });

                }
            );

        }
    );

};


// =====================================================
// DELETE USER
// =====================================================

const deleteAdminUser = (req, res) => {

    const { id } = req.params;

    // First delete user's activities
    const deleteActivitiesQuery = `
        DELETE FROM activity
        WHERE user_id = ?
    `;

    db.query(
        deleteActivitiesQuery,
        [id],
        (err) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            // Then delete user
            const deleteUserQuery = `
                DELETE FROM users
                WHERE id = ?
            `;

            db.query(
                deleteUserQuery,
                [id],
                (err, result) => {

                    if (err) {

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
                        message: "User deleted successfully"
                    });

                }
            );

        }
    );

};


module.exports = {
    getAdminUsers,
    getAdminUserById,
    deleteAdminUser
};