const express = require("express");

const router = express.Router();

const {
  createGoal,
  getGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

// ================= CREATE =================
router.post("/", createGoal);

// ================= GET USER GOAL =================
router.get("/:id", getGoal);

// ================= UPDATE =================
router.put("/:id", updateGoal);

// ================= DELETE =================
router.delete("/:id", deleteGoal);

module.exports = router;