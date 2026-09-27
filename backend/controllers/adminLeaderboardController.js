const db = require("../config/db");

// =====================================================
// GET ADMIN LEADERBOARD
// =====================================================

const getAdminLeaderboard = (req, res) => {

  const sql = `
    SELECT
      u.id,
      u.full_name,
      u.email,

      COUNT(a.id) AS total_activities,

      ROUND(
        COALESCE(SUM(a.carbon_emission), 0),
        2
      ) AS total_carbon,

      ROUND(
        COALESCE(AVG(a.carbon_emission), 0),
        2
      ) AS average_carbon

    FROM users u

    LEFT JOIN activity a
      ON u.id = a.user_id

    GROUP BY
      u.id,
      u.full_name,
      u.email

    ORDER BY
      total_carbon ASC,
      total_activities DESC

    LIMIT 50
  `;


  db.query(sql, (err, result) => {

    if (err) {

      console.error(
        "ADMIN LEADERBOARD ERROR:",
        err
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch leaderboard",
      });

    }


    const leaderboard = result.map(
      (user, index) => ({
        rank: index + 1,
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        total_activities:
          Number(user.total_activities || 0),
        total_carbon:
          Number(user.total_carbon || 0),
        average_carbon:
          Number(user.average_carbon || 0),
      })
    );


    return res.status(200).json({

      success: true,

      data: leaderboard,

    });

  });
};


// =====================================================
// GET LEADERBOARD SUMMARY
// =====================================================

const getAdminLeaderboardSummary = (
  req,
  res
) => {

  const sql = `
    SELECT

      COUNT(DISTINCT u.id) AS total_users,

      COUNT(a.id) AS total_activities,

      ROUND(
        COALESCE(SUM(a.carbon_emission), 0),
        2
      ) AS total_carbon,

      ROUND(
        COALESCE(
          AVG(a.carbon_emission),
          0
        ),
        2
      ) AS average_carbon

    FROM users u

    LEFT JOIN activity a
      ON u.id = a.user_id
  `;


  db.query(sql, (err, result) => {

    if (err) {

      console.error(
        "LEADERBOARD SUMMARY ERROR:",
        err
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch leaderboard summary",
      });

    }


    return res.status(200).json({

      success: true,

      data: result[0],

    });

  });
};


module.exports = {
  getAdminLeaderboard,
  getAdminLeaderboardSummary,
};