const db = require("../config/db");

// =====================================================
// GET ALL GOALS
// =====================================================

const getAdminGoals = (req, res) => {
  const sql = `
    SELECT
      g.id,
      g.user_id,
      g.target_reduction,
      g.start_date,
      g.end_date,
      g.status,

      u.full_name,
      u.email,

      COALESCE(
        (
          SELECT ROUND(SUM(a.carbon_emission), 2)
          FROM activity a
          WHERE a.user_id = g.user_id
            AND DATE(a.created_at) >= DATE(g.start_date)
            AND DATE(a.created_at) <= DATE(g.end_date)
        ),
        0
      ) AS current_carbon

    FROM goals g

    LEFT JOIN users u
      ON u.id = g.user_id

    ORDER BY g.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("ADMIN GOALS ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch goals",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  });
};


// =====================================================
// GET GOAL BY ID
// =====================================================

const getAdminGoalById = (req, res) => {
  const goalId = Number(req.params.id);

  if (!Number.isInteger(goalId) || goalId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid goal id",
    });
  }

  const goalQuery = `
    SELECT
      g.id,
      g.user_id,
      g.target_reduction,
      g.start_date,
      g.end_date,
      g.status,
      u.full_name,
      u.email
    FROM goals g
    LEFT JOIN users u
      ON u.id = g.user_id
    WHERE g.id = ?
    LIMIT 1
  `;

  db.query(
    goalQuery,
    [goalId],
    (err, goalResult) => {
      if (err) {
        console.error(
          "ADMIN GOAL DETAILS ERROR:",
          err
        );

        return res.status(500).json({
          success: false,
          message: "Failed to fetch goal details",
        });
      }

      if (goalResult.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Goal not found",
        });
      }

      const goal = goalResult[0];

      const activityQuery = `
        SELECT
          id,
          activity_type,
          carbon_emission,
          created_at
        FROM activity
        WHERE user_id = ?
        ORDER BY created_at DESC
      `;

      db.query(
        activityQuery,
        [goal.user_id],
        (activityErr, activities) => {
          if (activityErr) {
            console.error(
              "ADMIN GOAL ACTIVITY ERROR:",
              activityErr
            );

            return res.status(500).json({
              success: false,
              message: "Failed to fetch goal activities",
            });
          }

          const currentCarbon = activities.reduce(
            (sum, item) =>
              sum +
              Number(item.carbon_emission || 0),
            0
          );

          return res.status(200).json({
            success: true,

            data: {
              goal,
              activities,
              currentCarbon:
                Number(currentCarbon.toFixed(2)),
            },
          });
        }
      );
    }
  );
};


// =====================================================
// DELETE GOAL
// =====================================================

const deleteAdminGoal = (req, res) => {
  const goalId = Number(req.params.id);

  if (!Number.isInteger(goalId) || goalId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid goal id",
    });
  }

  const sql = `
    DELETE FROM goals
    WHERE id = ?
  `;

  db.query(
    sql,
    [goalId],
    (err, result) => {
      if (err) {
        console.error(
          "ADMIN DELETE GOAL ERROR:",
          err
        );

        return res.status(500).json({
          success: false,
          message: "Failed to delete goal",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Goal not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Goal deleted successfully",
      });
    }
  );
};


module.exports = {
  getAdminGoals,
  getAdminGoalById,
  deleteAdminGoal,
};