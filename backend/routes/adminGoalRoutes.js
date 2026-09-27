const express = require("express");

const router = express.Router();

const {
  getAdminGoals,
  getAdminGoalById,
  deleteAdminGoal,
} = require("../controllers/adminGoalController");

const adminAuthMiddleware =
  require("../middleware/adminAuthMiddleware");

// ALL GOALS
router.get(
  "/",
  adminAuthMiddleware,
  getAdminGoals
);

// SINGLE GOAL
router.get(
  "/:id",
  adminAuthMiddleware,
  getAdminGoalById
);

// DELETE
router.delete(
  "/:id",
  adminAuthMiddleware,
  deleteAdminGoal
);

module.exports = router;