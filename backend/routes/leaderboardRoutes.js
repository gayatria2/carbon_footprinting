const express = require("express");

const router = express.Router();

const {
    getLeaderboard
} = require("../controllers/leaderboardController");

// =====================================================
// GET LEADERBOARD
// =====================================================

router.get("/:id", getLeaderboard);

module.exports = router;