const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    googleLogin,
    addActivity,
    getActivities,
    deleteActivity,
    updateActivity,
    getDashboard
} = require("../controllers/authController");


// =====================================================
// AUTH
// =====================================================

router.post(
    "/register",
    registerUser
);

router.post(
    "/login",
    loginUser
);

router.post(
    "/google",
    googleLogin
);


// =====================================================
// ACTIVITY
// =====================================================

router.post(
    "/add",
    addActivity
);

router.get(
    "/list",
    getActivities
);

router.delete(
    "/delete/:id",
    deleteActivity
);

router.put(
    "/update/:id",
    updateActivity
);


// =====================================================
// DASHBOARD
// =====================================================

router.get(
    "/dashboard/:id",
    getDashboard
);


module.exports = router;