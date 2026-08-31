const express = require("express");

const router = express.Router();

const {
    getRecommendations
} = require("../controllers/recommendationController");


// =====================================================
// GET USER RECOMMENDATIONS
// =====================================================

router.get("/:id", getRecommendations);


module.exports = router;