const db = require("../config/db");

// =====================================================
// GET RECOMMENDATIONS
// =====================================================

const getRecommendations = (req, res) => {
    const user_id = Number(req.params.id);

    // =====================================================
    // VALIDATE USER ID
    // =====================================================

    if (!Number.isInteger(user_id) || user_id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id"
        });
    }

    // =====================================================
    // LAST 30 DAYS - CATEGORY CARBON
    // =====================================================

    const topCategoryQuery = `
        SELECT
            CASE

                WHEN LOWER(TRIM(activity_type))
                    IN ('transportation', 'transport', 'travel')
                    THEN 'Transportation'

                WHEN LOWER(TRIM(activity_type))
                    IN ('electricity', 'electric')
                    THEN 'Electricity'

                WHEN LOWER(TRIM(activity_type))
                    IN ('waste', 'garbage')
                    THEN 'Waste'

                WHEN LOWER(TRIM(activity_type))
                    IN ('food', 'meal', 'diet')
                    THEN 'Food'

                ELSE activity_type

            END AS category,

            IFNULL(
                SUM(carbon_emission),
                0
            ) AS carbon

        FROM activity

        WHERE user_id = ?

        AND DATE(activity_date)
            >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)

        GROUP BY
            CASE

                WHEN LOWER(TRIM(activity_type))
                    IN ('transportation', 'transport', 'travel')
                    THEN 'Transportation'

                WHEN LOWER(TRIM(activity_type))
                    IN ('electricity', 'electric')
                    THEN 'Electricity'

                WHEN LOWER(TRIM(activity_type))
                    IN ('waste', 'garbage')
                    THEN 'Waste'

                WHEN LOWER(TRIM(activity_type))
                    IN ('food', 'meal', 'diet')
                    THEN 'Food'

                ELSE activity_type

            END

        ORDER BY carbon DESC

        LIMIT 3
    `;


    db.query(
        topCategoryQuery,
        [user_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }


            // =================================================
            // NO DATA
            // =================================================

            if (result.length === 0) {

                return res.status(200).json({
                    success: true,
                    message: "No activity data available for the last 30 days",
                    data: []
                });

            }


            // =================================================
            // RECOMMENDATION BUILDER
            // =================================================

            const recommendations = result.map((item, index) => {

                let title = "";
                let description = "";
                let priority = "";

                // =================================================
                // TRANSPORTATION
                // =================================================

                if (item.category === "Transportation") {

                    title = "Reduce Transportation Emissions";

                    description =
                        "Consider using public transport, carpooling, walking or cycling for suitable journeys. Reducing unnecessary vehicle trips can help lower your transportation carbon footprint.";

                    priority =
                        index === 0
                            ? "High Impact"
                            : "Medium Impact";
                }


                // =================================================
                // ELECTRICITY
                // =================================================

                else if (item.category === "Electricity") {

                    title = "Improve Electricity Efficiency";

                    description =
                        "Switch off lights and appliances when they are not needed, reduce unnecessary electricity consumption and prefer energy-efficient devices.";

                    priority =
                        index === 0
                            ? "High Impact"
                            : "Medium Impact";
                }


                // =================================================
                // WASTE
                // =================================================

                else if (item.category === "Waste") {

                    title = "Reduce and Reuse Waste";

                    description =
                        "Try to reduce unnecessary waste, reuse products whenever possible and separate recyclable materials from general waste.";

                    priority =
                        index === 0
                            ? "High Impact"
                            : "Medium Impact";
                }


                // =================================================
                // FOOD
                // =================================================

                else if (item.category === "Food") {

                    title = "Make Sustainable Food Choices";

                    description =
                        "Reduce food waste, plan meals carefully and consider lower-impact food choices to reduce the carbon footprint associated with your food consumption.";

                    priority =
                        index === 0
                            ? "High Impact"
                            : "Medium Impact";
                }


                // =================================================
                // DEFAULT
                // =================================================

                else {

                    title =
                        "Reduce Your Carbon Footprint";

                    description =
                        "Look for ways to reduce unnecessary consumption and choose more sustainable alternatives.";

                    priority = "Recommended";
                }


                return {
                    rank: index + 1,

                    type: item.category,

                    carbon:
                        Number(item.carbon || 0),

                    title,

                    description,

                    priority
                };

            });


            // =================================================
            // RESPONSE
            // =================================================

            return res.status(200).json({

                success: true,

                message:
                    "Recommendations fetched successfully",

                data: recommendations
            });

        }
    );
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    getRecommendations
};