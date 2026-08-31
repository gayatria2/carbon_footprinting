const db = require("../config/db");

// =====================================================
// GET ANALYTICS
// =====================================================

const getAnalytics = (req, res) => {

    const user_id = Number(req.params.id);


    // =====================================================
    // VALIDATE USER ID
    // =====================================================

    if (
        !Number.isInteger(user_id) ||
        user_id <= 0
    ) {

        return res.status(400).json({
            success: false,
            message: "Invalid user id"
        });

    }


    const analytics = {};


    // =====================================================
    // TOTAL CARBON
    // =====================================================

    const totalQuery = `
        SELECT
            IFNULL(
                SUM(carbon_emission),
                0
            ) AS totalCarbon
        FROM activity
        WHERE user_id = ?
    `;


    db.query(
        totalQuery,
        [user_id],
        (err, totalResult) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }


            analytics.totalCarbon =
                Number(
                    totalResult[0]?.totalCarbon || 0
                );


            // =================================================
            // TOTAL ACTIVITIES
            // =================================================

            const activityQuery = `
                SELECT
                    COUNT(*) AS totalActivities
                FROM activity
                WHERE user_id = ?
            `;


            db.query(
                activityQuery,
                [user_id],
                (err, activityResult) => {

                    if (err) {

                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });

                    }


                    analytics.totalActivities =
                        Number(
                            activityResult[0]?.totalActivities || 0
                        );


                    // =================================================
                    // DAILY CARBON
                    // =================================================

                    const dailyQuery = `
                        SELECT
                            DATE(activity_date)
                                AS activity_date,

                            IFNULL(
                                SUM(carbon_emission),
                                0
                            ) AS carbon

                        FROM activity

                        WHERE user_id = ?

                        GROUP BY DATE(activity_date)

                        ORDER BY DATE(activity_date) ASC
                    `;


                    db.query(
                        dailyQuery,
                        [user_id],
                        (err, dailyResult) => {

                            if (err) {

                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });

                            }


                            analytics.dailyCarbon =
                                dailyResult.map(
                                    (item) => ({

                                        activity_date:
                                            item.activity_date,

                                        carbon:
                                            Number(
                                                item.carbon || 0
                                            )

                                    })
                                );


                            // =================================================
                            // WEEKLY CARBON
                            // =================================================

                            const weeklyQuery = `
                                SELECT

                                    YEARWEEK(
                                        activity_date,
                                        1
                                    ) AS week,

                                    MIN(
                                        DATE_SUB(
                                            DATE(activity_date),
                                            INTERVAL WEEKDAY(activity_date) DAY
                                        )
                                    ) AS weekStart,

                                    IFNULL(
                                        SUM(carbon_emission),
                                        0
                                    ) AS carbon

                                FROM activity

                                WHERE user_id = ?

                                GROUP BY
                                    YEARWEEK(
                                        activity_date,
                                        1
                                    )

                                ORDER BY week ASC
                            `;


                            db.query(
                                weeklyQuery,
                                [user_id],
                                (err, weeklyResult) => {

                                    if (err) {

                                        return res.status(500).json({
                                            success: false,
                                            message: err.message
                                        });

                                    }


                                    analytics.weeklyCarbon =
                                        weeklyResult.map(
                                            (item) => ({

                                                week:
                                                    item.week,

                                                weekStart:
                                                    item.weekStart,

                                                carbon:
                                                    Number(
                                                        item.carbon || 0
                                                    )

                                            })
                                        );


                                    // =================================================
                                    // MONTHLY CARBON
                                    // =================================================

                                    const monthlyQuery = `
                                        SELECT

                                            YEAR(activity_date)
                                                AS year,

                                            MONTH(activity_date)
                                                AS month,

                                            DATE_FORMAT(
                                                MIN(activity_date),
                                                '%b %Y'
                                            ) AS monthName,

                                            IFNULL(
                                                SUM(carbon_emission),
                                                0
                                            ) AS carbon

                                        FROM activity

                                        WHERE user_id = ?

                                        GROUP BY
                                            YEAR(activity_date),
                                            MONTH(activity_date)

                                        ORDER BY
                                            YEAR(activity_date),
                                            MONTH(activity_date)
                                    `;


                                    db.query(
                                        monthlyQuery,
                                        [user_id],
                                        (err, monthlyResult) => {

                                            if (err) {

                                                return res.status(500).json({
                                                    success: false,
                                                    message: err.message
                                                });

                                            }


                                            analytics.monthlyCarbon =
                                                monthlyResult.map(
                                                    (item) => ({

                                                        year:
                                                            item.year,

                                                        month:
                                                            item.month,

                                                        monthName:
                                                            item.monthName,

                                                        carbon:
                                                            Number(
                                                                item.carbon || 0
                                                            )

                                                    })
                                                );


                                            // =================================================
                                            // CATEGORY CARBON
                                            // =================================================

                                            const categoryQuery = `
                                                SELECT

                                                    activity_type,

                                                    IFNULL(
                                                        SUM(carbon_emission),
                                                        0
                                                    ) AS carbon

                                                FROM activity

                                                WHERE user_id = ?

                                                AND LOWER(
                                                    TRIM(activity_type)
                                                ) IN (

                                                    'transportation',
                                                    'electricity',
                                                    'waste',
                                                    'food',
                                                    'water',
                                                    'shopping',
                                                    'travel',
                                                    'heating & cooling',
                                                    'heating and cooling',
                                                    'recycling'

                                                )

                                                GROUP BY
                                                    activity_type

                                                ORDER BY
                                                    carbon DESC
                                            `;


                                            db.query(
                                                categoryQuery,
                                                [user_id],
                                                (err, categoryResult) => {

                                                    if (err) {

                                                        return res.status(500).json({
                                                            success: false,
                                                            message: err.message
                                                        });

                                                    }


                                                    analytics.categoryCarbon =
                                                        categoryResult.map(
                                                            (item) => ({

                                                                activity_type:
                                                                    item.activity_type,

                                                                carbon:
                                                                    Number(
                                                                        item.carbon || 0
                                                                    )

                                                            })
                                                        );


                                                    // =================================================
                                                    // CATEGORY TOTALS
                                                    // =================================================

                                                    const categoryTotalsQuery = `
                                                        SELECT

                                                            /* =========================================
                                                               TRANSPORTATION
                                                            ========================================= */

                                                            IFNULL(
                                                                SUM(
                                                                    CASE
                                                                        WHEN LOWER(
                                                                            TRIM(activity_type)
                                                                        ) = 'transportation'

                                                                        THEN carbon_emission

                                                                        ELSE 0
                                                                    END
                                                                ),
                                                                0
                                                            ) AS transportationCarbon,


                                                            /* =========================================
                                                               ELECTRICITY
                                                            ========================================= */

                                                            IFNULL(
                                                                SUM(
                                                                    CASE
                                                                        WHEN LOWER(
                                                                            TRIM(activity_type)
                                                                        ) = 'electricity'

                                                                        THEN carbon_emission

                                                                        ELSE 0
                                                                    END
                                                                ),
                                                                0
                                                            ) AS electricityCarbon,


                                                            /* =========================================
                                                               WASTE
                                                            ========================================= */

                                                            IFNULL(
                                                                SUM(
                                                                    CASE
                                                                        WHEN LOWER(
                                                                            TRIM(activity_type)
                                                                        ) = 'waste'

                                                                        THEN carbon_emission

                                                                        ELSE 0
                                                                    END
                                                                ),
                                                                0
                                                            ) AS wasteCarbon,


                                                            /* =========================================
                                                               FOOD
                                                            ========================================= */

                                                            IFNULL(
                                                                SUM(
                                                                    CASE
                                                                        WHEN LOWER(
                                                                            TRIM(activity_type)
                                                                        ) = 'food'

                                                                        THEN carbon_emission

                                                                        ELSE 0
                                                                    END
                                                                ),
                                                                0
                                                            ) AS foodCarbon,


                                                            /* =========================================
                                                               WATER
                                                            ========================================= */

                                                            IFNULL(
                                                                SUM(
                                                                    CASE
                                                                        WHEN LOWER(
                                                                            TRIM(activity_type)
                                                                        ) = 'water'

                                                                        THEN carbon_emission

                                                                        ELSE 0
                                                                    END
                                                                ),
                                                                0
                                                            ) AS waterCarbon,


                                                            /* =========================================
                                                               SHOPPING
                                                            ========================================= */

                                                            IFNULL(
                                                                SUM(
                                                                    CASE
                                                                        WHEN LOWER(
                                                                            TRIM(activity_type)
                                                                        ) = 'shopping'

                                                                        THEN carbon_emission

                                                                        ELSE 0
                                                                    END
                                                                ),
                                                                0
                                                            ) AS shoppingCarbon,


                                                            /* =========================================
                                                               TRAVEL
                                                            ========================================= */

                                                            IFNULL(
                                                                SUM(
                                                                    CASE
                                                                        WHEN LOWER(
                                                                            TRIM(activity_type)
                                                                        ) = 'travel'

                                                                        THEN carbon_emission

                                                                        ELSE 0
                                                                    END
                                                                ),
                                                                0
                                                            ) AS travelCarbon,


                                                            /* =========================================
                                                               HEATING & COOLING
                                                            ========================================= */

                                                            IFNULL(
                                                                SUM(
                                                                    CASE
                                                                        WHEN LOWER(
                                                                            TRIM(activity_type)
                                                                        ) IN (
                                                                            'heating & cooling',
                                                                            'heating and cooling'
                                                                        )

                                                                        THEN carbon_emission

                                                                        ELSE 0
                                                                    END
                                                                ),
                                                                0
                                                            ) AS heatingCoolingCarbon,


                                                            /* =========================================
                                                               RECYCLING
                                                            ========================================= */

                                                            IFNULL(
                                                                SUM(
                                                                    CASE
                                                                        WHEN LOWER(
                                                                            TRIM(activity_type)
                                                                        ) = 'recycling'

                                                                        THEN carbon_emission

                                                                        ELSE 0
                                                                    END
                                                                ),
                                                                0
                                                            ) AS recyclingCarbon


                                                        FROM activity

                                                        WHERE user_id = ?
                                                    `;


                                                    db.query(
                                                        categoryTotalsQuery,
                                                        [user_id],
                                                        (err, totalsResult) => {

                                                            if (err) {

                                                                return res.status(500).json({
                                                                    success: false,
                                                                    message: err.message
                                                                });

                                                            }


                                                            const totals =
                                                                totalsResult[0] || {};


                                                            // =================================================
                                                            // SAVE CATEGORY VALUES
                                                            // =================================================

                                                            analytics.transportationCarbon =
                                                                Number(
                                                                    totals.transportationCarbon || 0
                                                                );


                                                            analytics.electricityCarbon =
                                                                Number(
                                                                    totals.electricityCarbon || 0
                                                                );


                                                            analytics.wasteCarbon =
                                                                Number(
                                                                    totals.wasteCarbon || 0
                                                                );


                                                            analytics.foodCarbon =
                                                                Number(
                                                                    totals.foodCarbon || 0
                                                                );


                                                            analytics.waterCarbon =
                                                                Number(
                                                                    totals.waterCarbon || 0
                                                                );


                                                            analytics.shoppingCarbon =
                                                                Number(
                                                                    totals.shoppingCarbon || 0
                                                                );


                                                            analytics.travelCarbon =
                                                                Number(
                                                                    totals.travelCarbon || 0
                                                                );


                                                            analytics.heatingCoolingCarbon =
                                                                Number(
                                                                    totals.heatingCoolingCarbon || 0
                                                                );


                                                            analytics.recyclingCarbon =
                                                                Number(
                                                                    totals.recyclingCarbon || 0
                                                                );


                                                            // =================================================
                                                            // ELECTRICITY KWH
                                                            // =================================================

                                                            const electricityKwhQuery = `
                                                                SELECT

                                                                    IFNULL(
                                                                        SUM(electricity),
                                                                        0
                                                                    ) AS electricityKwh

                                                                FROM activity

                                                                WHERE user_id = ?

                                                                AND LOWER(
                                                                    TRIM(activity_type)
                                                                ) = 'electricity'
                                                            `;


                                                            db.query(
                                                                electricityKwhQuery,
                                                                [user_id],
                                                                (err, electricityResult) => {

                                                                    if (err) {

                                                                        return res.status(500).json({
                                                                            success: false,
                                                                            message: err.message
                                                                        });

                                                                    }


                                                                    analytics.electricityKwh =
                                                                        Number(
                                                                            electricityResult[0]
                                                                                ?.electricityKwh || 0
                                                                        );


                                                                    // =================================================
                                                                    // HIGHEST CATEGORY
                                                                    // =================================================

                                                                    const highestQuery = `
                                                                        SELECT

                                                                            CASE

                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'transportation'

                                                                                    THEN 'Transportation'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'electricity'

                                                                                    THEN 'Electricity'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'waste'

                                                                                    THEN 'Waste'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'food'

                                                                                    THEN 'Food'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'water'

                                                                                    THEN 'Water'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'shopping'

                                                                                    THEN 'Shopping'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'travel'

                                                                                    THEN 'Travel'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) IN (
                                                                                    'heating & cooling',
                                                                                    'heating and cooling'
                                                                                )

                                                                                    THEN 'Heating & Cooling'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'recycling'

                                                                                    THEN 'Recycling'


                                                                                ELSE activity_type

                                                                            END AS activity_type,


                                                                            IFNULL(
                                                                                SUM(carbon_emission),
                                                                                0
                                                                            ) AS carbon


                                                                        FROM activity


                                                                        WHERE user_id = ?


                                                                        GROUP BY

                                                                            CASE

                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'transportation'

                                                                                    THEN 'Transportation'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'electricity'

                                                                                    THEN 'Electricity'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'waste'

                                                                                    THEN 'Waste'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'food'

                                                                                    THEN 'Food'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'water'

                                                                                    THEN 'Water'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'shopping'

                                                                                    THEN 'Shopping'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'travel'

                                                                                    THEN 'Travel'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) IN (
                                                                                    'heating & cooling',
                                                                                    'heating and cooling'
                                                                                )

                                                                                    THEN 'Heating & Cooling'


                                                                                WHEN LOWER(
                                                                                    TRIM(activity_type)
                                                                                ) = 'recycling'

                                                                                    THEN 'Recycling'


                                                                                ELSE activity_type

                                                                            END


                                                                        ORDER BY carbon DESC

                                                                        LIMIT 1
                                                                    `;


                                                                    db.query(
                                                                        highestQuery,
                                                                        [user_id],
                                                                        (err, highestResult) => {

                                                                            if (err) {

                                                                                return res.status(500).json({
                                                                                    success: false,
                                                                                    message: err.message
                                                                                });

                                                                            }


                                                                            analytics.highestCategory =
                                                                                highestResult.length > 0

                                                                                    ? {
                                                                                        activity_type:
                                                                                            highestResult[0]
                                                                                                .activity_type,

                                                                                        carbon:
                                                                                            Number(
                                                                                                highestResult[0]
                                                                                                    .carbon || 0
                                                                                            )
                                                                                    }

                                                                                    : null;


                                                                            // =================================================
                                                                            // FINAL RESPONSE
                                                                            // =================================================

                                                                            return res.status(200).json({

                                                                                success: true,

                                                                                data: analytics

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


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    getAnalytics
};