const db = require("../config/db");

// =====================================================
// GET ALL ACTIVITIES FOR ADMIN
// =====================================================

const getAdminActivities = (req, res) => {

    const sql = `
        SELECT
            a.id,
            a.user_id,
            u.full_name,
            u.email,
            a.activity_type,
            a.transport_type,
            a.distance,
            a.electricity,
            a.waste,
            a.food,
            a.carbon_emission,
            a.activity_date

        FROM activity a

        LEFT JOIN users u
            ON a.user_id = u.id

        ORDER BY a.id DESC
    `;


    db.query(
        sql,
        (err, result) => {

            if (err) {

                console.error(
                    "ADMIN ACTIVITIES ERROR:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }


            return res.status(200).json({

                success: true,

                data: result || []

            });

        }
    );

};


// =====================================================
// GET SINGLE ACTIVITY
// =====================================================

const getAdminActivityById = (req, res) => {

    const {
        id
    } = req.params;


    const sql = `
        SELECT
            a.id,
            a.user_id,
            u.full_name,
            u.email,
            a.activity_type,
            a.transport_type,
            a.distance,
            a.electricity,
            a.waste,
            a.food,
            a.carbon_emission,
            a.activity_date

        FROM activity a

        LEFT JOIN users u
            ON a.user_id = u.id

        WHERE a.id = ?

        LIMIT 1
    `;


    db.query(
        sql,
        [id],
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }


            if (result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Activity not found"
                });

            }


            return res.status(200).json({

                success: true,

                data: result[0]

            });

        }
    );

};


// =====================================================
// DELETE ACTIVITY
// =====================================================

const deleteAdminActivity = (req, res) => {

    const {
        id
    } = req.params;


    const sql = `
        DELETE FROM activity
        WHERE id = ?
    `;


    db.query(
        sql,
        [id],
        (err, result) => {

            if (err) {

                console.error(
                    "DELETE ACTIVITY ERROR:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }


            if (
                result.affectedRows === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message: "Activity not found"
                });

            }


            return res.status(200).json({

                success: true,

                message:
                    "Activity deleted successfully"

            });

        }
    );

};


module.exports = {

    getAdminActivities,

    getAdminActivityById,

    deleteAdminActivity

};