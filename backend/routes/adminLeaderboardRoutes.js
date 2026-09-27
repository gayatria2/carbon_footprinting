const express = require("express");

const router = express.Router();

const {
  getAdminLeaderboard,
  getAdminLeaderboardSummary,
} = require("../controllers/adminLeaderboardController");

const adminAuthMiddleware =
  require("../middleware/adminAuthMiddleware");


// LEADERBOARD
router.get(
  "/",
  adminAuthMiddleware,
  getAdminLeaderboard
);


// SUMMARY
router.get(
  "/summary",
  adminAuthMiddleware,
  getAdminLeaderboardSummary
);


module.exports = router;