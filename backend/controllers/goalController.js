const db = require("../config/db");

// =====================================================
// CREATE GOAL
// =====================================================

const createGoal = (req, res) => {
  const {
    user_id,
    target_reduction,
    start_date,
    end_date,
  } = req.body;

  if (
    !user_id ||
    target_reduction === undefined ||
    !start_date ||
    !end_date
  ) {
    return res.status(400).json({
      success: false,
      message: "All goal fields are required",
    });
  }

  const reduction = Number(target_reduction);

  if (reduction <= 0 || reduction >= 100) {
    return res.status(400).json({
      success: false,
      message: "Target reduction must be between 1 and 99",
    });
  }

  if (new Date(end_date) <= new Date(start_date)) {
    return res.status(400).json({
      success: false,
      message: "End date must be after start date",
    });
  }

  // Check existing active goal
  const checkQuery = `
    SELECT id
    FROM goals
    WHERE user_id = ?
    ORDER BY id DESC
    LIMIT 1
  `;

  db.query(checkQuery, [user_id], (err, existingGoal) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (existingGoal.length > 0) {
      return res.status(400).json({
        success: false,
        message: "A goal already exists. Please update or delete it.",
      });
    }

    const insertQuery = `
      INSERT INTO goals
      (
        user_id,
        target_reduction,
        start_date,
        end_date,
        status
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [
        user_id,
        reduction,
        start_date,
        end_date,
        "Active",
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        return res.status(201).json({
          success: true,
          message: "Goal created successfully",
          data: {
            id: result.insertId,
            user_id,
            target_reduction: reduction,
            start_date,
            end_date,
            status: "Active",
          },
        });
      }
    );
  });
};

// =====================================================
// GET GOAL + PROGRESS
// =====================================================

const getGoal = (req, res) => {
  const user_id = Number(req.params.id);

  if (!Number.isInteger(user_id) || user_id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid user id",
    });
  }

  const goalQuery = `
    SELECT
      id,
      user_id,
      target_reduction,
      start_date,
      end_date,
      status,
      created_at
    FROM goals
    WHERE user_id = ?
    ORDER BY id DESC
    LIMIT 1
  `;

  db.query(goalQuery, [user_id], (err, goalResult) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (goalResult.length === 0) {
      return res.status(200).json({
        success: true,
        data: null,
      });
    }

    const goal = goalResult[0];

    // =================================================
    // STARTING CARBON
    // =================================================

    const startingCarbonQuery = `
      SELECT
        IFNULL(SUM(carbon_emission), 0) AS startingCarbon
      FROM activity
      WHERE user_id = ?
        AND activity_date >= ?
        AND activity_date <= ?
    `;

    db.query(
      startingCarbonQuery,
      [
        user_id,
        goal.start_date,
        goal.end_date,
      ],
      (err, startingResult) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        const startingCarbon =
          Number(
            startingResult[0]?.startingCarbon
          ) || 0;

        // =================================================
        // CURRENT CARBON
        // =================================================

        const today = new Date()
          .toISOString()
          .split("T")[0];

        const currentCarbonQuery = `
          SELECT
            IFNULL(SUM(carbon_emission), 0) AS currentCarbon
          FROM activity
          WHERE user_id = ?
            AND activity_date >= ?
            AND activity_date <= LEAST(?, ?)
        `;

        db.query(
          currentCarbonQuery,
          [
            user_id,
            goal.start_date,
            today,
            goal.end_date,
          ],
          (err, currentResult) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: err.message,
              });
            }

            const currentCarbon =
              Number(
                currentResult[0]?.currentCarbon
              ) || 0;

            // =================================================
            // TARGET CARBON
            // =================================================

            const targetCarbon =
              startingCarbon *
              (1 -
                Number(goal.target_reduction) / 100);

            // =================================================
            // PROGRESS
            // =================================================

            let progressPercentage = 0;

            if (startingCarbon > 0) {
              const reduced =
                startingCarbon - currentCarbon;

              progressPercentage =
                (reduced / (startingCarbon - targetCarbon)) *
                100;
            }

            progressPercentage = Math.max(
              0,
              Math.min(100, progressPercentage)
            );

            // =================================================
            // REMAINING DAYS
            // =================================================

            const startDate = new Date(
              goal.start_date
            );

            const endDate = new Date(
              goal.end_date
            );

            const nowDate = new Date();

            let remainingDays = Math.ceil(
              (endDate - nowDate) /
                (1000 * 60 * 60 * 24)
            );

            remainingDays = Math.max(
              0,
              remainingDays
            );

            // =================================================
            // REQUIRED REDUCTION
            // =================================================

            const remainingCarbon =
              Math.max(
                0,
                currentCarbon - targetCarbon
              );

            const dailyReductionRequired =
              remainingDays > 0
                ? remainingCarbon / remainingDays
                : remainingCarbon;

            // =================================================
            // STATUS
            // =================================================

            let progressStatus = "On Track";

            if (currentCarbon <= targetCarbon) {
              progressStatus = "Goal Achieved";
            } else if (
              remainingDays === 0 &&
              currentCarbon > targetCarbon
            ) {
              progressStatus = "Behind";
            } else if (
              startingCarbon > 0 &&
              currentCarbon > startingCarbon
            ) {
              progressStatus = "Behind";
            }

            return res.status(200).json({
              success: true,

              data: {
                goal: {
                  id: goal.id,
                  user_id: goal.user_id,
                  target_reduction:
                    Number(
                      goal.target_reduction
                    ),
                  start_date: goal.start_date,
                  end_date: goal.end_date,
                  status: goal.status,
                  created_at: goal.created_at,
                },

                progress: {
                  startingCarbon,
                  currentCarbon,
                  targetCarbon,
                  progressPercentage,
                  remainingDays,
                  dailyReductionRequired,
                  status: progressStatus,
                },
              },
            });
          }
        );
      }
    );
  });
};

// =====================================================
// UPDATE GOAL
// =====================================================

const updateGoal = (req, res) => {
  const goalId = Number(req.params.id);

  const {
    target_reduction,
    start_date,
    end_date,
  } = req.body;

  if (!Number.isInteger(goalId) || goalId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid goal id",
    });
  }

  if (
    target_reduction === undefined ||
    !start_date ||
    !end_date
  ) {
    return res.status(400).json({
      success: false,
      message: "All goal fields are required",
    });
  }

  const reduction = Number(target_reduction);

  if (reduction <= 0 || reduction >= 100) {
    return res.status(400).json({
      success: false,
      message: "Target reduction must be between 1 and 99",
    });
  }

  if (new Date(end_date) <= new Date(start_date)) {
    return res.status(400).json({
      success: false,
      message: "End date must be after start date",
    });
  }

  const updateQuery = `
    UPDATE goals
    SET
      target_reduction = ?,
      start_date = ?,
      end_date = ?
    WHERE id = ?
  `;

  db.query(
    updateQuery,
    [
      reduction,
      start_date,
      end_date,
      goalId,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
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
        message: "Goal updated successfully",
      });
    }
  );
};

// =====================================================
// DELETE GOAL
// =====================================================

const deleteGoal = (req, res) => {
  const goalId = Number(req.params.id);

  if (!Number.isInteger(goalId) || goalId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid goal id",
    });
  }

  const deleteQuery = `
    DELETE FROM goals
    WHERE id = ?
  `;

  db.query(
    deleteQuery,
    [goalId],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
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
  createGoal,
  getGoal,
  updateGoal,
  deleteGoal,
};