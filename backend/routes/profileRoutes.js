const express = require("express");

const router = express.Router();

const {
    getProfile,
    updateProfile,
    changePassword
} = require("../controllers/profileController");


// =====================================================
// GET PROFILE
// =====================================================

router.get(
    "/:id",
    getProfile
);


// =====================================================
// UPDATE PROFILE
// =====================================================

router.put(
    "/:id",
    updateProfile
);


// =====================================================
// CHANGE PASSWORD
// =====================================================

router.put(
    "/:id/password",
    changePassword
);


module.exports = router;