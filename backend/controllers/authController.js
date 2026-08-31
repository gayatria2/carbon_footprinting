









const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

// =====================================================
// REGISTER USER
// =====================================================

const registerUser = async (req, res) => {
    try {
        const {
            full_name,
            email,
            password,
            sustainability_preference
        } = req.body;

        if (!full_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All required fields are mandatory"
            });
        }

        const checkQuery = `
            SELECT * FROM users
            WHERE email = ?
        `;

        db.query(checkQuery, [email], async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertQuery = `
                INSERT INTO users
                (
                    full_name,
                    email,
                    password,
                    sustainability_preference
                )
                VALUES (?, ?, ?, ?)
            `;

            db.query(
                insertQuery,
                [
                    full_name,
                    email,
                    hashedPassword,
                    sustainability_preference || null
                ],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    return res.status(201).json({
                        success: true,
                        message: "User Registered Successfully"
                    });
                }
            );
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =====================================================
// LOGIN USER
// =====================================================

const loginUser = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    const sql = `
        SELECT * FROM users
        WHERE email = ?
    `;

    db.query(sql, [email], async (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            });
        }

        const user = result[0];

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email
            }
        });
    });
};




// =====================================================
// GET ALL ACTIVITIES
// =====================================================

const getActivities = (req, res) => {

    const sql = `
        SELECT *
        FROM activity
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    });
};


// =====================================================
// GOOGLE LOGIN
// =====================================================

const googleLogin = async (req, res) => {

    try {

        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                success: false,
                message: "Google credential is required"
            });
        }

        // Verify Google ID token
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        const email = payload.email;
        const full_name = payload.name || "Google User";

        if (!email || !payload.email_verified) {
            return res.status(401).json({
                success: false,
                message: "Google email could not be verified"
            });
        }

        // =================================================
        // CHECK EXISTING USER
        // =================================================

        const checkQuery = `
            SELECT
                id,
                full_name,
                email,
                password,
                sustainability_preference
            FROM users
            WHERE email = ?
            LIMIT 1
        `;

        db.query(
            checkQuery,
            [email],
            async (err, result) => {

                if (err) {
                    console.error(
                        "Google User Check Error:",
                        err
                    );

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                // =================================================
                // EXISTING USER
                // =================================================

                if (result.length > 0) {

                    const user = result[0];

                    const token = jwt.sign(
                        {
                            id: user.id,
                            email: user.email
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "1d"
                        }
                    );

                    return res.status(200).json({
                        success: true,
                        message: "Google Login Successful",

                        token,

                        user: {
                            id: user.id,
                            full_name: user.full_name,
                            email: user.email
                        }
                    });
                }

                // =================================================
                // NEW USER
                // =================================================

                const randomPassword =
                    `${email}_${Date.now()}`;

                const hashedPassword =
                    await bcrypt.hash(
                        randomPassword,
                        10
                    );

                const insertQuery = `
                    INSERT INTO users
                    (
                        full_name,
                        email,
                        password,
                        sustainability_preference
                    )
                    VALUES (?, ?, ?, ?)
                `;

                db.query(
                    insertQuery,
                    [
                        full_name,
                        email,
                        hashedPassword,
                        null
                    ],
                    (insertErr, insertResult) => {

                        if (insertErr) {

                            console.error(
                                "Google User Insert Error:",
                                insertErr
                            );

                            return res.status(500).json({
                                success: false,
                                message:
                                    insertErr.message
                            });
                        }

                        const userId =
                            insertResult.insertId;

                        const token = jwt.sign(
                            {
                                id: userId,
                                email
                            },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: "1d"
                            }
                        );

                        return res.status(201).json({
                            success: true,
                            message:
                                "Google Account Created Successfully",

                            token,

                            user: {
                                id: userId,
                                full_name,
                                email
                            }
                        });
                    }
                );
            }
        );

    } catch (error) {

        console.error(
            "Google Login Error:",
            error
        );

        return res.status(401).json({
            success: false,
            message: "Invalid Google login"
        });
    }
};

// =====================================================
// ADD ACTIVITY
// =====================================================

// const addActivity = (req, res) => {

//     // const {
//     //     user_id,
//     //     activity_type,
//     //     transport_type,
//     //     distance,
//     //     electricity,
//     //     waste,
//     //     food,
//     //     activity_date
//     // } = req.body;

//     db.query(
//     sql,
//     [
//         user_id,
//         activity_type,
//         finalTransportType,
//         finalDistance,
//         finalElectricity,
//         finalWaste,
//         finalFood,
//         Number(carbon_emission.toFixed(2)),
//         activity_date
//     ],
//     (err, result) => {

//         // =====================================================
//         // ACTIVITY INSERT ERROR
//         // =====================================================

//         if (err) {

//             return res.status(500).json({
//                 success: false,
//                 message: err.message
//             });
//         }


//         // =====================================================
//         // CREATE NOTIFICATION
//         // =====================================================

//         const notificationQuery = `
//             INSERT INTO notifications
//             (
//                 user_id,
//                 title,
//                 message,
//                 type
//             )
//             VALUES (?, ?, ?, ?)
//         `;


//         const notificationMessage =
//             `Your ${activity_type} activity was added successfully. Carbon emission: ${Number(
//                 carbon_emission.toFixed(2)
//             )} kg CO₂.`;


//         db.query(
//             notificationQuery,
//             [
//                 user_id,
//                 "Activity Added",
//                 notificationMessage,
//                 "activity"
//             ],
//             (notificationErr) => {

//                 // =================================================
//                 // NOTIFICATION ERROR
//                 // =================================================

//                 if (notificationErr) {

//                     console.error(
//                         "Notification Insert Error:",
//                         notificationErr
//                     );

//                 }


//                 // =================================================
//                 // FINAL RESPONSE
//                 // =================================================

//                 return res.status(201).json({

//                     success: true,

//                     message:
//                         "Activity Added Successfully",

//                     data: {

//                         id: result.insertId,

//                         carbon_emission:
//                             Number(
//                                 carbon_emission.toFixed(2)
//                             )

//                     }

//                 });

//             }
//         );

//     }
// );

//     // ---------------- VALIDATION ----------------

//     if (!user_id || !activity_type || !activity_date) {
//         return res.status(400).json({
//             success: false,
//             message: "User, activity type and date are required"
//         });
//     }

//     let carbon_emission = 0;

//     let finalTransportType = null;
//     let finalDistance = 0;
//     let finalElectricity = 0;
//     let finalWaste = 0;
//     let finalFood = 0;


//     // =====================================================
//     // TRANSPORTATION
//     // =====================================================

//     if (activity_type === "Transportation") {

//         finalTransportType = transport_type || null;
//         finalDistance = Number(distance) || 0;

//         if (!finalTransportType) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Transport type is required"
//             });
//         }

//         if (finalDistance <= 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Distance must be greater than 0"
//             });
//         }

//         if (finalTransportType === "Bike") {

//             carbon_emission =
//                 finalDistance * 0.09;

//         } else if (finalTransportType === "Car") {

//             carbon_emission =
//                 finalDistance * 0.21;

//         } else if (finalTransportType === "Bus") {

//             carbon_emission =
//                 finalDistance * 0.10;

//         } else if (finalTransportType === "Train") {

//             carbon_emission =
//                 finalDistance * 0.04;

//         } else {

//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid transport type"
//             });
//         }
//     }


//     // =====================================================
//     // ELECTRICITY
//     // =====================================================

//     else if (activity_type === "Electricity") {

//         finalElectricity =
//             Number(electricity) || 0;

//         if (finalElectricity <= 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Electricity (KWh) is required"
//             });
//         }

//         // 1 KWh = 0.82 kg CO2
//         carbon_emission =
//             finalElectricity * 0.82;
//     }


//     // =====================================================
//     // WASTE
//     // =====================================================

//     else if (activity_type === "Waste") {

//         finalWaste =
//             Number(waste) || 0;

//         if (finalWaste <= 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Waste quantity is required"
//             });
//         }

//         // 1 KG Waste = 0.57 kg CO2
//         carbon_emission =
//             finalWaste * 0.57;
//     }


//     // =====================================================
//     // FOOD
//     // =====================================================

//     else if (activity_type === "Food") {

//         finalFood =
//             Number(food) || 0;

//         if (finalFood <= 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Food quantity is required"
//             });
//         }

//         // 1 KG Food = 2.5 kg CO2
//         carbon_emission =
//             finalFood * 2.5;
//     }


//     // =====================================================
//     // INVALID ACTIVITY
//     // =====================================================

//     else {

//         return res.status(400).json({
//             success: false,
//             message: "Invalid activity type"
//         });
//     }


//     // =====================================================
//     // INSERT INTO DATABASE
//     // =====================================================

//     const sql = `
//         INSERT INTO activity
//         (
//             user_id,
//             activity_type,
//             transport_type,
//             distance,
//             electricity,
//             waste,
//             food,
//             carbon_emission,
//             activity_date
//         )
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     db.query(
//         sql,
//         [
//             user_id,
//             activity_type,
//             finalTransportType,
//             finalDistance,
//             finalElectricity,
//             finalWaste,
//             finalFood,
//             Number(carbon_emission.toFixed(2)),
//             activity_date
//         ],
//         (err, result) => {

//             if (err) {

//                 return res.status(500).json({
//                     success: false,
//                     message: err.message
//                 });
//             }

//             return res.status(201).json({
//                 success: true,
//                 message: "Activity Added Successfully",
//                 data: {
//                     id: result.insertId,
//                     carbon_emission:
//                         Number(carbon_emission.toFixed(2))
//                 }
//             });
//         }
//     );
// };


// =====================================================
// ADD ACTIVITY
// =====================================================

// const addActivity = (req, res) => {

//     const {
//         user_id,
//         activity_type,
//         transport_type,
//         distance,
//         electricity,
//         waste,
//         food,
//         activity_date
//     } = req.body;


//     // =====================================================
//     // VALIDATION
//     // =====================================================

//     if (!user_id || !activity_type || !activity_date) {

//         return res.status(400).json({
//             success: false,
//             message: "User, activity type and date are required"
//         });

//     }


//     let carbon_emission = 0;

//     let finalTransportType = null;
//     let finalDistance = 0;
//     let finalElectricity = 0;
//     let finalWaste = 0;
//     let finalFood = 0;


//     // =====================================================
//     // TRANSPORTATION
//     // =====================================================

//     if (activity_type === "Transportation") {

//         finalTransportType =
//             transport_type || null;

//         finalDistance =
//             Number(distance) || 0;


//         if (!finalTransportType) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Transport type is required"
//             });

//         }


//         if (finalDistance <= 0) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Distance must be greater than 0"
//             });

//         }


//         if (finalTransportType === "Bike") {

//             carbon_emission =
//                 finalDistance * 0.09;

//         }

//         else if (finalTransportType === "Car") {

//             carbon_emission =
//                 finalDistance * 0.21;

//         }

//         else if (finalTransportType === "Bus") {

//             carbon_emission =
//                 finalDistance * 0.10;

//         }

//         else if (finalTransportType === "Train") {

//             carbon_emission =
//                 finalDistance * 0.04;

//         }

//         else {

//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid transport type"
//             });

//         }

//     }


//     // =====================================================
//     // ELECTRICITY
//     // =====================================================

//     else if (activity_type === "Electricity") {

//         finalElectricity =
//             Number(electricity) || 0;


//         if (finalElectricity <= 0) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Electricity (KWh) is required"
//             });

//         }


//         // 1 KWh = 0.82 kg CO2
//         carbon_emission =
//             finalElectricity * 0.82;

//     }


//     // =====================================================
//     // WASTE
//     // =====================================================

//     else if (activity_type === "Waste") {

//         finalWaste =
//             Number(waste) || 0;


//         if (finalWaste <= 0) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Waste quantity is required"
//             });

//         }


//         // 1 KG Waste = 0.57 kg CO2
//         carbon_emission =
//             finalWaste * 0.57;

//     }


//     // =====================================================
//     // FOOD
//     // =====================================================

//     else if (activity_type === "Food") {

//         finalFood =
//             Number(food) || 0;


//         if (finalFood <= 0) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Food quantity is required"
//             });

//         }


//         // 1 KG Food = 2.5 kg CO2
//         carbon_emission =
//             finalFood * 2.5;

//     }


//     // =====================================================
//     // INVALID ACTIVITY
//     // =====================================================

//     else {

//         return res.status(400).json({
//             success: false,
//             message: "Invalid activity type"
//         });

//     }


//     // =====================================================
//     // INSERT ACTIVITY
//     // =====================================================

//     const sql = `
//         INSERT INTO activity
//         (
//             user_id,
//             activity_type,
//             transport_type,
//             distance,
//             electricity,
//             waste,
//             food,
//             carbon_emission,
//             activity_date
//         )
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;


//     db.query(
//         sql,
//         [
//             user_id,
//             activity_type,
//             finalTransportType,
//             finalDistance,
//             finalElectricity,
//             finalWaste,
//             finalFood,
//             Number(carbon_emission.toFixed(2)),
//             activity_date
//         ],
//         (err, result) => {

//             // =================================================
//             // ACTIVITY ERROR
//             // =================================================

//             if (err) {

//                 console.error(
//                     "Activity Insert Error:",
//                     err
//                 );

//                 return res.status(500).json({
//                     success: false,
//                     message: err.message
//                 });

//             }


//             // =================================================
//             // CREATE NOTIFICATION
//             // =================================================

//             const notificationQuery = `
//                 INSERT INTO notifications
//                 (
//                     user_id,
//                     title,
//                     message,
//                     type
//                 )
//                 VALUES (?, ?, ?, ?)
//             `;


//             const notificationMessage =
//                 `Your ${activity_type} activity was added successfully. Carbon emission: ${Number(
//                     carbon_emission.toFixed(2)
//                 )} kg CO₂.`;


//             db.query(
//                 notificationQuery,
//                 [
//                     user_id,
//                     "Activity Added",
//                     notificationMessage,
//                     "activity"
//                 ],
//                 (notificationErr) => {

//                     // Notification fail झाली
//                     // तरी activity save झालेली आहे.

//                     if (notificationErr) {

//                         console.error(
//                             "Notification Insert Error:",
//                             notificationErr
//                         );

//                     }


//                     // =================================================
//                     // SUCCESS RESPONSE
//                     // =================================================

//                     return res.status(201).json({

//                         success: true,

//                         message:
//                             "Activity Added Successfully",

//                         data: {

//                             id:
//                                 result.insertId,

//                             carbon_emission:
//                                 Number(
//                                     carbon_emission.toFixed(2)
//                                 )

//                         }

//                     });

//                 }
//             );

//         }
//     );

// };

// =====================================================
// ADD ACTIVITY
// =====================================================

const addActivity = (req, res) => {

    const {
        user_id,
        activity_type,
        transport_type,
        distance,
        electricity,
        waste,
        food,
        water,
        shopping,
        travel,
        heating_cooling,
        recycling,
        activity_date
    } = req.body;


    // =====================================================
    // VALIDATION
    // =====================================================

    if (!user_id || !activity_type || !activity_date) {

        return res.status(400).json({
            success: false,
            message:
                "User, activity type and date are required"
        });

    }


    let carbon_emission = 0;

    let finalTransportType = null;
    let finalDistance = 0;
    let finalElectricity = 0;
    let finalWaste = 0;
    let finalFood = 0;
    let finalWater = 0;
    let finalShopping = 0;
    let finalTravel = 0;
    let finalHeatingCooling = 0;
    let finalRecycling = 0;


    // =====================================================
    // TRANSPORTATION
    // =====================================================

    if (activity_type === "Transportation") {

        finalTransportType =
            transport_type || null;

        finalDistance =
            Number(distance) || 0;


        if (!finalTransportType) {

            return res.status(400).json({
                success: false,
                message:
                    "Transport type is required"
            });

        }


        if (finalDistance <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Distance must be greater than 0"
            });

        }


        if (finalTransportType === "Bike") {

            carbon_emission =
                finalDistance * 0.09;

        }

        else if (finalTransportType === "Car") {

            carbon_emission =
                finalDistance * 0.21;

        }

        else if (finalTransportType === "Bus") {

            carbon_emission =
                finalDistance * 0.10;

        }

        else if (finalTransportType === "Train") {

            carbon_emission =
                finalDistance * 0.04;

        }

        else {

            return res.status(400).json({
                success: false,
                message:
                    "Invalid transport type"
            });

        }

    }


    // =====================================================
    // ELECTRICITY
    // =====================================================

    else if (activity_type === "Electricity") {

        finalElectricity =
            Number(electricity) || 0;


        if (finalElectricity <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Electricity (KWh) is required"
            });

        }


        carbon_emission =
            finalElectricity * 0.82;

    }


    // =====================================================
    // WASTE
    // =====================================================

    else if (activity_type === "Waste") {

        finalWaste =
            Number(waste) || 0;


        if (finalWaste <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Waste quantity is required"
            });

        }


        carbon_emission =
            finalWaste * 0.57;

    }


    // =====================================================
    // FOOD
    // =====================================================

    else if (activity_type === "Food") {

        finalFood =
            Number(food) || 0;


        if (finalFood <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Food quantity is required"
            });

        }


        carbon_emission =
            finalFood * 2.5;

    }


    // =====================================================
    // WATER
    // =====================================================

    else if (activity_type === "Water") {

        finalWater =
            Number(water) || 0;


        if (finalWater <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Water usage is required"
            });

        }


        // Project assumption:
        // 1 liter water = 0.0003 kg CO2

        carbon_emission =
            finalWater * 0.0003;

    }


    // =====================================================
    // SHOPPING
    // =====================================================

    else if (activity_type === "Shopping") {

        finalShopping =
            Number(shopping) || 0;


        if (finalShopping <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Shopping amount is required"
            });

        }


        // Project assumption:
        // ₹1 shopping = 0.0005 kg CO2

        carbon_emission =
            finalShopping * 0.0005;

    }


    // =====================================================
    // TRAVEL
    // =====================================================

    else if (activity_type === "Travel") {

        finalTravel =
            Number(travel) || 0;


        if (finalTravel <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Travel distance is required"
            });

        }


        // Project assumption:
        // 1 km travel = 0.20 kg CO2

        carbon_emission =
            finalTravel * 0.20;

    }


    // =====================================================
    // HEATING & COOLING
    // =====================================================

    else if (
        activity_type === "Heating & Cooling"
    ) {

        finalHeatingCooling =
            Number(heating_cooling) || 0;


        if (finalHeatingCooling <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Heating & Cooling hours are required"
            });

        }


        // Project assumption:
        // 1 hour = 0.50 kg CO2

        carbon_emission =
            finalHeatingCooling * 0.50;

    }


    // =====================================================
    // RECYCLING
    // =====================================================

    else if (activity_type === "Recycling") {

        finalRecycling =
            Number(recycling) || 0;


        if (finalRecycling <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Recycling quantity is required"
            });

        }


        // Project assumption:
        // 1 kg recycled material = 0.10 kg CO2

        carbon_emission =
            finalRecycling * 0.10;

    }


    // =====================================================
    // INVALID ACTIVITY
    // =====================================================

    else {

        return res.status(400).json({
            success: false,
            message:
                "Invalid activity type"
        });

    }


    // =====================================================
    // INSERT ACTIVITY
    // =====================================================

    const sql = `
        INSERT INTO activity
        (
            user_id,
            activity_type,
            transport_type,
            distance,
            electricity,
            waste,
            food,
            water,
            shopping,
            travel,
            heating_cooling,
            recycling,
            carbon_emission,
            activity_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


    db.query(
        sql,
        [
            user_id,
            activity_type,
            finalTransportType,
            finalDistance,
            finalElectricity,
            finalWaste,
            finalFood,
            finalWater,
            finalShopping,
            finalTravel,
            finalHeatingCooling,
            finalRecycling,
            Number(
                carbon_emission.toFixed(2)
            ),
            activity_date
        ],
        (err, result) => {

            // =================================================
            // ACTIVITY ERROR
            // =================================================

            if (err) {

                console.error(
                    "Activity Insert Error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }


            // =================================================
            // CREATE NOTIFICATION
            // =================================================

            const notificationQuery = `
                INSERT INTO notifications
                (
                    user_id,
                    title,
                    message,
                    type
                )
                VALUES (?, ?, ?, ?)
            `;


            const notificationMessage =
                `Your ${activity_type} activity was added successfully. Carbon emission: ${Number(
                    carbon_emission.toFixed(2)
                )} kg CO₂.`;


            db.query(
                notificationQuery,
                [
                    user_id,
                    "Activity Added",
                    notificationMessage,
                    "activity"
                ],
                (notificationErr) => {

                    if (notificationErr) {

                        console.error(
                            "Notification Insert Error:",
                            notificationErr
                        );

                    }


                    // =================================================
                    // SUCCESS
                    // =================================================

                    return res.status(201).json({

                        success: true,

                        message:
                            "Activity Added Successfully",

                        data: {

                            id:
                                result.insertId,

                            activity_type,

                            carbon_emission:
                                Number(
                                    carbon_emission.toFixed(2)
                                )

                        }

                    });

                }
            );

        }
    );

};

// =====================================================
// DELETE ACTIVITY
// =====================================================

const deleteActivity = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM activity
        WHERE id = ?
    `;

    db.query(sql, [id], (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "Activity Deleted Successfully"
        });
    });
};


// =====================================================
// UPDATE ACTIVITY
// =====================================================

// const updateActivity = (req, res) => {

//     const { id } = req.params;

//     const {
//         activity_type,
//         transport_type,
//         distance,
//         electricity,
//         waste,
//         food,
//         activity_date
//     } = req.body;

//     if (!activity_type || !activity_date) {

//         return res.status(400).json({
//             success: false,
//             message: "Activity type and date are required"
//         });
//     }

//     let carbon_emission = 0;

//     let finalTransportType = null;
//     let finalDistance = 0;
//     let finalElectricity = 0;
//     let finalWaste = 0;
//     let finalFood = 0;


//     // =====================================================
//     // TRANSPORTATION
//     // =====================================================

//     if (activity_type === "Transportation") {

//         finalTransportType =
//             transport_type || null;

//         finalDistance =
//             Number(distance) || 0;

//         if (!finalTransportType) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Transport type is required"
//             });
//         }

//         if (finalDistance <= 0) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Distance must be greater than 0"
//             });
//         }

//         if (finalTransportType === "Bike") {

//             carbon_emission =
//                 finalDistance * 0.09;

//         } else if (finalTransportType === "Car") {

//             carbon_emission =
//                 finalDistance * 0.21;

//         } else if (finalTransportType === "Bus") {

//             carbon_emission =
//                 finalDistance * 0.10;

//         } else if (finalTransportType === "Train") {

//             carbon_emission =
//                 finalDistance * 0.04;

//         } else {

//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid transport type"
//             });
//         }
//     }


//     // =====================================================
//     // ELECTRICITY
//     // =====================================================

//     else if (activity_type === "Electricity") {

//         finalElectricity =
//             Number(electricity) || 0;

//         if (finalElectricity <= 0) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Electricity (KWh) is required"
//             });
//         }

//         carbon_emission =
//             finalElectricity * 0.82;
//     }


//     // =====================================================
//     // WASTE
//     // =====================================================

//     else if (activity_type === "Waste") {

//         finalWaste =
//             Number(waste) || 0;

//         if (finalWaste <= 0) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Waste quantity is required"
//             });
//         }

//         carbon_emission =
//             finalWaste * 0.57;
//     }


//     // =====================================================
//     // FOOD
//     // =====================================================

//     else if (activity_type === "Food") {

//         finalFood =
//             Number(food) || 0;

//         if (finalFood <= 0) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Food quantity is required"
//             });
//         }

//         carbon_emission =
//             finalFood * 2.5;
//     }


//     else {

//         return res.status(400).json({
//             success: false,
//             message: "Invalid activity type"
//         });
//     }


//     // =====================================================
//     // UPDATE DATABASE
//     // =====================================================

//     const sql = `
//         UPDATE activity
//         SET
//             activity_type = ?,
//             transport_type = ?,
//             distance = ?,
//             electricity = ?,
//             waste = ?,
//             food = ?,
//             carbon_emission = ?,
//             activity_date = ?
//         WHERE id = ?
//     `;

//     db.query(
//         sql,
//         [
//             activity_type,
//             finalTransportType,
//             finalDistance,
//             finalElectricity,
//             finalWaste,
//             finalFood,
//             Number(carbon_emission.toFixed(2)),
//             activity_date,
//             id
//         ],
//         (err, result) => {

//             if (err) {

//                 return res.status(500).json({
//                     success: false,
//                     message: err.message
//                 });
//             }

//             if (result.affectedRows === 0) {

//                 return res.status(404).json({
//                     success: false,
//                     message: "Activity not found"
//                 });
//             }

//             return res.status(200).json({
//                 success: true,
//                 message: "Activity Updated Successfully",
//                 data: {
//                     id,
//                     carbon_emission:
//                         Number(carbon_emission.toFixed(2))
//                 }
//             });
//         }
//     );
// };
// =====================================================
// UPDATE ACTIVITY
// =====================================================

const updateActivity = (req, res) => {

    const { id } = req.params;

    const {
        activity_type,
        transport_type,
        distance,
        electricity,
        waste,
        food,
        water,
        shopping,
        travel,
        heating_cooling,
        recycling,
        activity_date
    } = req.body;


    // =====================================================
    // VALIDATION
    // =====================================================

    if (
        !activity_type ||
        !activity_date
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Activity type and date are required"
        });

    }


    let carbon_emission = 0;

    let finalTransportType = null;
    let finalDistance = 0;
    let finalElectricity = 0;
    let finalWaste = 0;
    let finalFood = 0;
    let finalWater = 0;
    let finalShopping = 0;
    let finalTravel = 0;
    let finalHeatingCooling = 0;
    let finalRecycling = 0;


    // =====================================================
    // TRANSPORTATION
    // =====================================================

    if (
        activity_type === "Transportation"
    ) {

        finalTransportType =
            transport_type || null;

        finalDistance =
            Number(distance) || 0;


        if (!finalTransportType) {

            return res.status(400).json({
                success: false,
                message:
                    "Transport type is required"
            });

        }


        if (finalDistance <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Distance must be greater than 0"
            });

        }


        if (finalTransportType === "Bike") {

            carbon_emission =
                finalDistance * 0.09;

        }

        else if (finalTransportType === "Car") {

            carbon_emission =
                finalDistance * 0.21;

        }

        else if (finalTransportType === "Bus") {

            carbon_emission =
                finalDistance * 0.10;

        }

        else if (finalTransportType === "Train") {

            carbon_emission =
                finalDistance * 0.04;

        }

        else {

            return res.status(400).json({
                success: false,
                message:
                    "Invalid transport type"
            });

        }

    }


    // =====================================================
    // ELECTRICITY
    // =====================================================

    else if (
        activity_type === "Electricity"
    ) {

        finalElectricity =
            Number(electricity) || 0;


        if (finalElectricity <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Electricity (KWh) is required"
            });

        }


        carbon_emission =
            finalElectricity * 0.82;

    }


    // =====================================================
    // WASTE
    // =====================================================

    else if (
        activity_type === "Waste"
    ) {

        finalWaste =
            Number(waste) || 0;


        if (finalWaste <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Waste quantity is required"
            });

        }


        carbon_emission =
            finalWaste * 0.57;

    }


    // =====================================================
    // FOOD
    // =====================================================

    else if (
        activity_type === "Food"
    ) {

        finalFood =
            Number(food) || 0;


        if (finalFood <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Food quantity is required"
            });

        }


        carbon_emission =
            finalFood * 2.5;

    }


    // =====================================================
    // WATER
    // =====================================================

    else if (
        activity_type === "Water"
    ) {

        finalWater =
            Number(water) || 0;


        if (finalWater <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Water usage is required"
            });

        }


        carbon_emission =
            finalWater * 0.0003;

    }


    // =====================================================
    // SHOPPING
    // =====================================================

    else if (
        activity_type === "Shopping"
    ) {

        finalShopping =
            Number(shopping) || 0;


        if (finalShopping <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Shopping amount is required"
            });

        }


        carbon_emission =
            finalShopping * 0.0005;

    }


    // =====================================================
    // TRAVEL
    // =====================================================

    else if (
        activity_type === "Travel"
    ) {

        finalTravel =
            Number(travel) || 0;


        if (finalTravel <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Travel distance is required"
            });

        }


        carbon_emission =
            finalTravel * 0.20;

    }


    // =====================================================
    // HEATING & COOLING
    // =====================================================

    else if (
        activity_type === "Heating & Cooling"
    ) {

        finalHeatingCooling =
            Number(heating_cooling) || 0;


        if (finalHeatingCooling <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Heating & Cooling hours are required"
            });

        }


        carbon_emission =
            finalHeatingCooling * 0.50;

    }


    // =====================================================
    // RECYCLING
    // =====================================================

    else if (
        activity_type === "Recycling"
    ) {

        finalRecycling =
            Number(recycling) || 0;


        if (finalRecycling <= 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Recycling quantity is required"
            });

        }


        carbon_emission =
            finalRecycling * 0.10;

    }


    // =====================================================
    // INVALID
    // =====================================================

    else {

        return res.status(400).json({
            success: false,
            message:
                "Invalid activity type"
        });

    }


    // =====================================================
    // UPDATE DATABASE
    // =====================================================

    const sql = `
        UPDATE activity
        SET
            activity_type = ?,
            transport_type = ?,
            distance = ?,
            electricity = ?,
            waste = ?,
            food = ?,
            water = ?,
            shopping = ?,
            travel = ?,
            heating_cooling = ?,
            recycling = ?,
            carbon_emission = ?,
            activity_date = ?
        WHERE id = ?
    `;


    db.query(
        sql,
        [
            activity_type,
            finalTransportType,
            finalDistance,
            finalElectricity,
            finalWaste,
            finalFood,
            finalWater,
            finalShopping,
            finalTravel,
            finalHeatingCooling,
            finalRecycling,
            Number(
                carbon_emission.toFixed(2)
            ),
            activity_date,
            id
        ],
        (err, result) => {

            if (err) {

                console.error(
                    "Activity Update Error:",
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
                    message:
                        "Activity not found"
                });

            }


            return res.status(200).json({

                success: true,

                message:
                    "Activity Updated Successfully",

                data: {

                    id,

                    activity_type,

                    carbon_emission:
                        Number(
                            carbon_emission.toFixed(2)
                        )

                }

            });

        }
    );

};

// =====================================================
// DASHBOARD
// =====================================================

const getDashboard = (req, res) => {

    const user_id = req.params.id;

    const dashboardQuery = `

        SELECT

            IFNULL(
                SUM(
                    CASE
                        WHEN DATE(activity_date) = CURDATE()
                        THEN carbon_emission
                        ELSE 0
                    END
                ),
                0
            ) AS todayCarbon,

            IFNULL(
                SUM(
                    CASE
                        WHEN YEARWEEK(DATE(activity_date), 1)
                             = YEARWEEK(CURDATE(), 1)
                        THEN carbon_emission
                        ELSE 0
                    END
                ),
                0
            ) AS weeklyCarbon,

            IFNULL(
                SUM(
                    CASE
                        WHEN MONTH(activity_date) = MONTH(CURDATE())
                        AND YEAR(activity_date) = YEAR(CURDATE())
                        THEN carbon_emission
                        ELSE 0
                    END
                ),
                0
            ) AS monthlyCarbon,

            IFNULL(
                SUM(carbon_emission),
                0
            ) AS totalCarbon,

            IFNULL(
                SUM(carbon_emission) * 0.20,
                0
            ) AS carbonSaved,

            COUNT(*) AS totalActivities,

            IFNULL(
                SUM(
                    CASE
                        WHEN activity_type = 'Transportation'
                        THEN carbon_emission
                        ELSE 0
                    END
                ),
                0
            ) AS transportCarbon,

            IFNULL(
                SUM(
                    CASE
                        WHEN activity_type = 'Electricity'
                        THEN carbon_emission
                        ELSE 0
                    END
                ),
                0
            ) AS electricityCarbon,

            IFNULL(
                SUM(
                    CASE
                        WHEN activity_type = 'Waste'
                        THEN carbon_emission
                        ELSE 0
                    END
                ),
                0
            ) AS wasteCarbon,

            IFNULL(
                SUM(
                    CASE
                        WHEN activity_type = 'Food'
                        THEN carbon_emission
                        ELSE 0
                    END
                ),
                0
            ) AS foodCarbon

        FROM activity
        WHERE user_id = ?

    `;

    db.query(
        dashboardQuery,
        [user_id],
        (err, dashboardResult) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            const dashboard =
                dashboardResult[0] || {};


            // =====================================================
            // PIE CHART
            // =====================================================

            const pieQuery = `
                SELECT
                    activity_type,
                    IFNULL(
                        SUM(carbon_emission),
                        0
                    ) AS total
                FROM activity
                WHERE user_id = ?
                GROUP BY activity_type
                ORDER BY total DESC
            `;

            db.query(
                pieQuery,
                [user_id],
                (err, pieResult) => {

                    if (err) {

                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    dashboard.pieChart =
                        pieResult || [];


                    // =====================================================
                    // LINE CHART
                    // =====================================================

                    const lineQuery = `
                        SELECT
                            DATE(activity_date)
                                AS activity_date,
                            IFNULL(
                                SUM(carbon_emission),
                                0
                            ) AS carbon
                        FROM activity
                        WHERE user_id = ?
                        GROUP BY DATE(activity_date)
                        ORDER BY DATE(activity_date) ASC
                    `;

                    db.query(
                        lineQuery,
                        [user_id],
                        (err, lineResult) => {

                            if (err) {

                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            }

                            dashboard.lineChart =
                                lineResult || [];


                            // =====================================================
                            // RECENT ACTIVITIES
                            // =====================================================

                            const recentQuery = `
                                SELECT *
                                FROM activity
                                WHERE user_id = ?
                                ORDER BY id DESC
                                LIMIT 5
                            `;

                            db.query(
                                recentQuery,
                                [user_id],
                                (err, recentResult) => {

                                    if (err) {

                                        return res.status(500).json({
                                            success: false,
                                            message: err.message
                                        });
                                    }

                                    dashboard.recentActivities =
                                        recentResult || [];

                                    return res.status(200).json({
                                        success: true,
                                        data: dashboard
                                    });
                                }
                            );
                        }
                    );
                }
            );
        }
    );
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    registerUser,
    loginUser,
    googleLogin,
    getActivities,
    addActivity,
    deleteActivity,
    updateActivity,
    getDashboard
};