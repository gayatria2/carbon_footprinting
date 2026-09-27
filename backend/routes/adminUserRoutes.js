const express = require("express");

const router = express.Router();

const {
    getAdminUsers,
    getAdminUserById,
    deleteAdminUser
} = require(
    "../controllers/adminUserController"
);


// =====================================================
// GET ALL USERS
// =====================================================

router.get(
    "/",
    getAdminUsers
);


// =====================================================
// GET SINGLE USER
// =====================================================

router.get(
    "/:id",
    getAdminUserById
);


// =====================================================
// DELETE USER
// =====================================================

router.delete(
    "/:id",
    deleteAdminUser
);


module.exports = router;