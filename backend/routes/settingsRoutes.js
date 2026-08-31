const express = require("express");

const router = express.Router();

const {
    getSettings,
    updateSettings,
    resetSettings
} = require("../controllers/settingsController");


// GET SETTINGS
router.get(
    "/:id",
    getSettings
);


// UPDATE SETTINGS
router.put(
    "/:id",
    updateSettings
);


// RESET SETTINGS
router.put(
    "/:id/reset",
    resetSettings
);


module.exports = router;