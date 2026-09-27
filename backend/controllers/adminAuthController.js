const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// =====================================================
// ADMIN LOGIN
// =====================================================

const adminLogin = (req, res) => {

    const {
        email,
        password
    } = req.body;


    // =================================================
    // VALIDATION
    // =================================================

    if (!email || !password) {

        return res.status(400).json({

            success: false,

            message:
                "Email and password are required"

        });

    }


    // =================================================
    // FIND ADMIN
    // =================================================

    const sql = `
        SELECT
            id,
            full_name,
            email,
            password
        FROM admins
        WHERE email = ?
        LIMIT 1
    `;


    db.query(
        sql,
        [email],
        async (err, result) => {

            // =================================================
            // DATABASE ERROR
            // =================================================

            if (err) {

                console.error(
                    "ADMIN LOGIN DB ERROR:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Database error"

                });

            }


            // =================================================
            // ADMIN NOT FOUND
            // =================================================

            if (result.length === 0) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid admin email or password"

                });

            }


            const admin = result[0];


            // =================================================
            // PASSWORD CHECK
            // =================================================

            const passwordMatch =
                await bcrypt.compare(
                    password,
                    admin.password
                );


            if (!passwordMatch) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid admin email or password"

                });

            }


            // =================================================
            // CREATE JWT
            // =================================================

            const token = jwt.sign(

                {
                    id: admin.id,

                    email: admin.email,

                    role: "admin"

                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "1d"
                }

            );


            // =================================================
            // RESPONSE
            // =================================================

            return res.status(200).json({

                success: true,

                message:
                    "Admin login successful",

                token,

                admin: {

                    id:
                        admin.id,

                    full_name:
                        admin.full_name,

                    email:
                        admin.email,

                    role:
                        "admin"

                }

            });

        }
    );

};


module.exports = {

    adminLogin

};