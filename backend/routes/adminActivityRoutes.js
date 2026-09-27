const express = require("express");

const router = express.Router();


const {
    getAdminActivities,
    getAdminActivityById,
    deleteAdminActivity
} = require(
    "../controllers/adminActivityController"
);


// =====================================================
// GET ALL ACTIVITIES
// =====================================================

router.get(
    "/",
    getAdminActivities
);


// =====================================================
// GET SINGLE ACTIVITY
// =====================================================

router.get(
    "/:id",
    getAdminActivityById
);


// =====================================================
// DELETE ACTIVITY
// =====================================================

router.delete(
    "/:id",
    deleteAdminActivity
);


module.exports = router;