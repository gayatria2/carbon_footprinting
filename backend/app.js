const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const goalRoutes = require("./routes/goalRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const profileRoutes = require("./routes/profileRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
 const adminUserRoutes = require("./routes/adminUserRoutes");
const adminActivityRoutes =  require("./routes/adminActivityRoutes");
const adminAnalyticsRoutes = require("./routes/adminAnalyticsRoutes");
const adminGoalRoutes = require("./routes/adminGoalRoutes");
const adminLeaderboardRoutes = require("./routes/adminLeaderboardRoutes");

const adminEmissionFactorRoutes = require("./routes/adminEmissionFactorRoutes");

const adminReportRoutes = require("./routes/adminReportRoutes");
// Load Environment Variables
dotenv.config();

// Database Connection
require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/goals", goalRoutes);
app.use( "/api/recommendations",recommendationRoutes);
app.use( "/api/leaderboard",leaderboardRoutes);
app.use( "/api/notifications",  notificationRoutes);
app.use( "/api/profile", profileRoutes);
 app.use( "/api/settings", settingsRoutes);
 app.use( "/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/dashboard",adminDashboardRoutes);
app.use("/api/admin/users",adminUserRoutes);
app.use( "/api/admin/activities", adminActivityRoutes);

app.use(  "/api/admin/analytics",adminAnalyticsRoutes);
app.use( "/api/admin/goals" , adminGoalRoutes);
app.use( "/api/admin/leaderboard",adminLeaderboardRoutes);

app.use (  "/api/admin/emission-factors", adminEmissionFactorRoutes);
app.use("/api/admin/reports", adminReportRoutes);



// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Carbon Tracker Backend Running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server Running on Port ${PORT}`);
});