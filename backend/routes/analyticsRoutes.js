const express = require("express");

const router = express.Router();

const {
  getAnalytics,
} = require("../controllers/analyticsController");


// GET Analytics
router.get("/:id", getAnalytics);


module.exports = router;