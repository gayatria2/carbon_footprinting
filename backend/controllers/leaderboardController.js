const db = require("../config/db");

// =====================================================
// GET LEADERBOARD
// =====================================================

const getLeaderboard = (req, res) => {
    const user_id = Number(req.params.id);

    if (!Number.isInteger(user_id) || user_id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid user id"
        });
    }

    const query = `
        SELECT
            u.id,
            u.full_name,

            IFNULL(
                SUM(a.carbon_emission),
                0
            ) AS totalCarbon,

            COUNT(a.id) AS totalActivities

        FROM users u

        LEFT JOIN activity a
            ON u.id = a.user_id

        GROUP BY
            u.id,
            u.full_name

        ORDER BY
            totalCarbon ASC,
            totalActivities DESC,
            u.id ASC
    `;

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        // =================================================
        // ADD RANK
        // =================================================

        const leaderboard = result.map((user, index) => {

            return {
                rank: index + 1,

                id: user.id,

                full_name:
                    user.full_name || "User",

                totalCarbon:
                    Number(user.totalCarbon) || 0,

                totalActivities:
                    Number(user.totalActivities) || 0,

                isCurrentUser:
                    Number(user.id) === user_id
            };
        });


        // =================================================
        // CURRENT USER
        // =================================================

        const currentUser =
            leaderboard.find(
                user =>
                    user.id === user_id
            ) || null;


        // =================================================
        // TOP 3
        // =================================================

        const topThree =
            leaderboard.slice(0, 3);


        // =================================================
        // RESPONSE
        // =================================================

        return res.status(200).json({

            success: true,

            data: {
                leaderboard,
                topThree,
                currentUser
            }

        });
    });
};


module.exports = {
    getLeaderboard
};