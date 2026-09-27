const express = require("express");
const router = express.Router();

const {
  getOverallReport,
  getCategoryReport,
  getUserReport,
  getMonthlyReport,
  getDateRangeReport,
  getCompleteReport,
} = require("../controllers/adminReportController");

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

router.get(
  "/",
  adminAuthMiddleware,
  getCompleteReport
);

router.get(
  "/overall",
  adminAuthMiddleware,
  getOverallReport
);

router.get(
  "/categories",
  adminAuthMiddleware,
  getCategoryReport
);

router.get(
  "/users",
  adminAuthMiddleware,
  getUserReport
);

router.get(
  "/monthly",
  adminAuthMiddleware,
  getMonthlyReport
);

router.get(
  "/date-range",
  adminAuthMiddleware,
  getDateRangeReport
);

module.exports = router;