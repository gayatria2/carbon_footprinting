const db = require("../config/db");


// =====================================================
// ADMIN DASHBOARD
// =====================================================

const getAdminDashboard = (req, res) => {

    const dashboard = {};


    // =====================================================
    // 1. TOTAL USERS
    // =====================================================

    const totalUsersQuery = `
        SELECT COUNT(*) AS totalUsers
        FROM users
    `;


    db.query(
        totalUsersQuery,
        (err, result) => {

            if (err) {

                console.error(
                    "TOTAL USERS ERROR:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }


            dashboard.totalUsers =
                Number(result[0]?.totalUsers || 0);


            // =====================================================
            // 2. TOTAL ACTIVITIES
            // =====================================================

            const totalActivitiesQuery = `
                SELECT COUNT(*) AS totalActivities
                FROM activity
            `;


            db.query(
                totalActivitiesQuery,
                (err, result) => {

                    if (err) {

                        console.error(
                            "TOTAL ACTIVITIES ERROR:",
                            err
                        );

                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });

                    }


                    dashboard.totalActivities =
                        Number(
                            result[0]?.totalActivities || 0
                        );


                    // =====================================================
                    // 3. TOTAL CARBON
                    // =====================================================

                    const totalCarbonQuery = `
                        SELECT
                            IFNULL(
                                SUM(carbon_emission),
                                0
                            ) AS totalCarbon
                        FROM activity
                    `;


                    db.query(
                        totalCarbonQuery,
                        (err, result) => {

                            if (err) {

                                console.error(
                                    "TOTAL CARBON ERROR:",
                                    err
                                );

                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });

                            }


                            dashboard.totalCarbon =
                                Number(
                                    result[0]?.totalCarbon || 0
                                );


                            // =====================================================
                            // 4. TODAY'S ACTIVITIES
                            // =====================================================

                            const todayActivitiesQuery = `
                                SELECT COUNT(*) AS todayActivities
                                FROM activity
                                WHERE DATE(activity_date)
                                = CURDATE()
                            `;


                            db.query(
                                todayActivitiesQuery,
                                (err, result) => {

                                    if (err) {

                                        console.error(
                                            "TODAY ACTIVITIES ERROR:",
                                            err
                                        );

                                        return res.status(500).json({
                                            success: false,
                                            message: err.message
                                        });

                                    }


                                    dashboard.todayActivities =
                                        Number(
                                            result[0]?.todayActivities || 0
                                        );


                                    // =====================================================
                                    // 5. TODAY'S CARBON
                                    // =====================================================

                                    const todayCarbonQuery = `
                                        SELECT
                                            IFNULL(
                                                SUM(carbon_emission),
                                                0
                                            ) AS todayCarbon
                                        FROM activity
                                        WHERE DATE(activity_date)
                                        = CURDATE()
                                    `;


                                    db.query(
                                        todayCarbonQuery,
                                        (err, result) => {

                                            if (err) {

                                                console.error(
                                                    "TODAY CARBON ERROR:",
                                                    err
                                                );

                                                return res.status(500).json({
                                                    success: false,
                                                    message: err.message
                                                });

                                            }


                                            dashboard.todayCarbon =
                                                Number(
                                                    result[0]?.todayCarbon || 0
                                                );


                                            // =====================================================
                                            // 6. TOTAL REGISTERED ADMINS
                                            // =====================================================

                                            const totalAdminsQuery = `
                                                SELECT COUNT(*) AS totalAdmins
                                                FROM admins
                                            `;


                                            db.query(
                                                totalAdminsQuery,
                                                (err, result) => {

                                                    if (err) {

                                                        console.error(
                                                            "TOTAL ADMINS ERROR:",
                                                            err
                                                        );

                                                        return res.status(500).json({
                                                            success: false,
                                                            message: err.message
                                                        });

                                                    }


                                                    dashboard.totalAdmins =
                                                        Number(
                                                            result[0]?.totalAdmins || 0
                                                        );


                                                    // =====================================================
                                                    // 7. CATEGORY-WISE CARBON
                                                    // =====================================================

                                                    const categoryQuery = `
                                                        SELECT
                                                            activity_type,
                                                            IFNULL(
                                                                SUM(carbon_emission),
                                                                0
                                                            ) AS total
                                                        FROM activity
                                                        GROUP BY activity_type
                                                        ORDER BY total DESC
                                                    `;


                                                    db.query(
                                                        categoryQuery,
                                                        (err, result) => {

                                                            if (err) {

                                                                console.error(
                                                                    "CATEGORY ERROR:",
                                                                    err
                                                                );

                                                                return res.status(500).json({
                                                                    success: false,
                                                                    message: err.message
                                                                });

                                                            }


                                                            dashboard.categoryCarbon =
                                                                result || [];


                                                            // =====================================================
                                                            // 8. RECENT ACTIVITIES
                                                            // =====================================================

                                                            const recentActivitiesQuery = `
                                                                SELECT
                                                                    a.id,
                                                                    a.user_id,
                                                                    u.full_name,
                                                                    u.email,
                                                                    a.activity_type,
                                                                    a.transport_type,
                                                                    a.distance,
                                                                    a.electricity,
                                                                    a.waste,
                                                                    a.food,
                                                                    a.carbon_emission,
                                                                    a.activity_date
                                                                FROM activity a
                                                                LEFT JOIN users u
                                                                    ON a.user_id = u.id
                                                                ORDER BY a.id DESC
                                                                LIMIT 10
                                                            `;


                                                            db.query(
                                                                recentActivitiesQuery,
                                                                (err, result) => {

                                                                    if (err) {

                                                                        console.error(
                                                                            "RECENT ACTIVITIES ERROR:",
                                                                            err
                                                                        );

                                                                        return res.status(500).json({
                                                                            success: false,
                                                                            message: err.message
                                                                        });

                                                                    }


                                                                    dashboard.recentActivities =
                                                                        result || [];


                                                                    // =====================================================
                                                                    // 9. RECENT USERS
                                                                    // =====================================================

                                                                    const recentUsersQuery = `
                                                                        SELECT
                                                                            id,
                                                                            full_name,
                                                                            email,
                                                                            sustainability_preference,
                                                                            created_at
                                                                        FROM users
                                                                        ORDER BY id DESC
                                                                        LIMIT 10
                                                                    `;


                                                                    db.query(
                                                                        recentUsersQuery,
                                                                        (err, result) => {

                                                                            if (err) {

                                                                                console.error(
                                                                                    "RECENT USERS ERROR:",
                                                                                    err
                                                                                );

                                                                                return res.status(500).json({
                                                                                    success: false,
                                                                                    message: err.message
                                                                                });

                                                                            }


                                                                            dashboard.recentUsers =
                                                                                result || [];


                                                                                // =====================================================
                                                                                // 10. FINAL RESPONSE
                                                                                // =====================================================

                                                                                return res.status(200).json({

                                                                                    success: true,

                                                                                    data: dashboard

                                                                                });

                                                                        }
                                                                    );

                                                                }
                                                            );

                                                        }
                                                    );

                                                }
                                            );

                                        }
                                    );

                                }
                            );

                        }
                    );

                }
            );

        }
    );

};


module.exports = {

    getAdminDashboard

};