const express = require("express");

const router = express.Router();

const {
  getEmissionFactors,
  getEmissionFactorById,
  createEmissionFactor,
  updateEmissionFactor,
  deleteEmissionFactor,
  toggleEmissionFactorStatus,
} = require("../controllers/adminEmissionFactorController");

const adminAuthMiddleware =
  require("../middleware/adminAuthMiddleware");


// GET ALL
router.get(
  "/",
  adminAuthMiddleware,
  getEmissionFactors
);


// GET SINGLE
router.get(
  "/:id",
  adminAuthMiddleware,
  getEmissionFactorById
);


// CREATE
router.post(
  "/",
  adminAuthMiddleware,
  createEmissionFactor
);


// UPDATE
router.put(
  "/:id",
  adminAuthMiddleware,
  updateEmissionFactor
);


// DELETE
router.delete(
  "/:id",
  adminAuthMiddleware,
  deleteEmissionFactor
);


// TOGGLE STATUS
router.patch(
  "/:id/status",
  adminAuthMiddleware,
  toggleEmissionFactorStatus
);


module.exports = router;