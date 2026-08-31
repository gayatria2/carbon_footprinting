const db = require("../config/db");

// =====================================================
// DEFAULT SETTINGS
// =====================================================

const DEFAULT_SETTINGS = {
    activity_alerts: 1,
    goal_reminders: 1,
    weekly_summary: 1,
    eco_tips: 1,
    achievement_alerts: 1,
    primary_goal: "Reduce Carbon",
    tracking_frequency: "Daily",
    theme: "Light",
    profile_visibility: "Private",
};


// =====================================================
// GET SETTINGS
// =====================================================

const getSettings = (req, res) => {

    const userId = Number(req.params.id);

    if (!userId) {

        return res.status(400).json({
            success: false,
            message: "Valid user ID is required"
        });

    }


    const selectQuery = `
        SELECT
            id,
            user_id,
            activity_alerts,
            goal_reminders,
            weekly_summary,
            eco_tips,
            achievement_alerts,
            primary_goal,
            tracking_frequency,
            theme,
            profile_visibility,
            created_at,
            updated_at
        FROM user_settings
        WHERE user_id = ?
        LIMIT 1
    `;


    db.query(
        selectQuery,
        [userId],
        (err, result) => {

            if (err) {

                console.error(
                    "Get Settings DB Error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }


            // -------------------------------------------------
            // SETTINGS NOT FOUND
            // CREATE DEFAULT SETTINGS
            // -------------------------------------------------

            if (result.length === 0) {

                const insertQuery = `
                    INSERT INTO user_settings
                    (
                        user_id,
                        activity_alerts,
                        goal_reminders,
                        weekly_summary,
                        eco_tips,
                        achievement_alerts,
                        primary_goal,
                        tracking_frequency,
                        theme,
                        profile_visibility
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;


                const values = [
                    userId,
                    DEFAULT_SETTINGS.activity_alerts,
                    DEFAULT_SETTINGS.goal_reminders,
                    DEFAULT_SETTINGS.weekly_summary,
                    DEFAULT_SETTINGS.eco_tips,
                    DEFAULT_SETTINGS.achievement_alerts,
                    DEFAULT_SETTINGS.primary_goal,
                    DEFAULT_SETTINGS.tracking_frequency,
                    DEFAULT_SETTINGS.theme,
                    DEFAULT_SETTINGS.profile_visibility
                ];


                db.query(
                    insertQuery,
                    values,
                    (insertErr, insertResult) => {

                        if (insertErr) {

                            console.error(
                                "Create Default Settings Error:",
                                insertErr
                            );

                            return res.status(500).json({
                                success: false,
                                message:
                                    insertErr.message
                            });

                        }


                        return res.status(200).json({

                            success: true,

                            message:
                                "Default settings created",

                            data: {
                                id:
                                    insertResult.insertId,

                                user_id:
                                    userId,

                                ...DEFAULT_SETTINGS
                            }

                        });

                    }
                );

                return;
            }


            // -------------------------------------------------
            // EXISTING SETTINGS
            // -------------------------------------------------

            return res.status(200).json({

                success: true,

                data: result[0]

            });

        }
    );

};


// =====================================================
// UPDATE SETTINGS
// =====================================================

const updateSettings = (req, res) => {

    const userId = Number(req.params.id);


    if (!userId) {

        return res.status(400).json({
            success: false,
            message: "Valid user ID is required"
        });

    }


    const {
        activity_alerts,
        goal_reminders,
        weekly_summary,
        eco_tips,
        achievement_alerts,
        primary_goal,
        tracking_frequency,
        theme,
        profile_visibility
    } = req.body;


    // =====================================================
    // NORMALIZE BOOLEAN VALUES
    // =====================================================

    const toBooleanNumber = (value) => {

        if (
            value === true ||
            value === 1 ||
            value === "1" ||
            value === "true"
        ) {
            return 1;
        }

        return 0;
    };


    const values = [

        userId,

        toBooleanNumber(
            activity_alerts
        ),

        toBooleanNumber(
            goal_reminders
        ),

        toBooleanNumber(
            weekly_summary
        ),

        toBooleanNumber(
            eco_tips
        ),

        toBooleanNumber(
            achievement_alerts
        ),

        primary_goal ||
            DEFAULT_SETTINGS.primary_goal,

        tracking_frequency ||
            DEFAULT_SETTINGS.tracking_frequency,

        theme ||
            DEFAULT_SETTINGS.theme,

        profile_visibility ||
            DEFAULT_SETTINGS.profile_visibility

    ];


    // =====================================================
    // UPSERT
    // =====================================================

    const query = `
        INSERT INTO user_settings
        (
            user_id,
            activity_alerts,
            goal_reminders,
            weekly_summary,
            eco_tips,
            achievement_alerts,
            primary_goal,
            tracking_frequency,
            theme,
            profile_visibility
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

        ON DUPLICATE KEY UPDATE

            activity_alerts = VALUES(activity_alerts),
            goal_reminders = VALUES(goal_reminders),
            weekly_summary = VALUES(weekly_summary),
            eco_tips = VALUES(eco_tips),
            achievement_alerts = VALUES(achievement_alerts),
            primary_goal = VALUES(primary_goal),
            tracking_frequency = VALUES(tracking_frequency),
            theme = VALUES(theme),
            profile_visibility = VALUES(profile_visibility)
    `;


    db.query(
        query,
        values,
        (err, result) => {

            if (err) {

                console.error(
                    "Update Settings DB Error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }


            return res.status(200).json({

                success: true,

                message:
                    "Settings updated successfully",

                affectedRows:
                    result.affectedRows

            });

        }
    );

};


// =====================================================
// RESET SETTINGS
// =====================================================

const resetSettings = (req, res) => {

    const userId = Number(req.params.id);


    if (!userId) {

        return res.status(400).json({
            success: false,
            message: "Valid user ID is required"
        });

    }


    const query = `
        INSERT INTO user_settings
        (
            user_id,
            activity_alerts,
            goal_reminders,
            weekly_summary,
            eco_tips,
            achievement_alerts,
            primary_goal,
            tracking_frequency,
            theme,
            profile_visibility
        )
        VALUES (?, 1, 1, 1, 1, 1,
                'Reduce Carbon',
                'Daily',
                'Light',
                'Private')

        ON DUPLICATE KEY UPDATE

            activity_alerts = 1,
            goal_reminders = 1,
            weekly_summary = 1,
            eco_tips = 1,
            achievement_alerts = 1,
            primary_goal = 'Reduce Carbon',
            tracking_frequency = 'Daily',
            theme = 'Light',
            profile_visibility = 'Private'
    `;


    db.query(
        query,
        [userId],
        (err) => {

            if (err) {

                console.error(
                    "Reset Settings DB Error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }


            return res.status(200).json({

                success: true,

                message:
                    "Settings reset successfully"

            });

        }
    );

};


module.exports = {
    getSettings,
    updateSettings,
    resetSettings
};