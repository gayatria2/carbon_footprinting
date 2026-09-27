const express = require("express");
const router = express.Router();

const {
  getAdminAnalytics,
  getDailyCarbon,
  getWeeklyCarbon,
  getMonthlyCarbon,
  getCategoryCarbon,
  getActivityCountByCategory,
  getTopUsers,
} = require("../controllers/adminAnalyticsController");

const adminAuthMiddleware =
  require("../middleware/adminAuthMiddleware");


// Complete analytics
router.get(
  "/",
  adminAuthMiddleware,
  getAdminAnalytics
);


// Individual analytics
router.get(
  "/daily",
  adminAuthMiddleware,
  getDailyCarbon
);

router.get(
  "/weekly",
  adminAuthMiddleware,
  getWeeklyCarbon
);

router.get(
  "/monthly",
  adminAuthMiddleware,
  getMonthlyCarbon
);

router.get(
  "/categories",
  adminAuthMiddleware,
  getCategoryCarbon
);

router.get(
  "/activity-count",
  adminAuthMiddleware,
  getActivityCountByCategory
);

router.get(
  "/top-users",
  adminAuthMiddleware,
  getTopUsers
);

module.exports = router;