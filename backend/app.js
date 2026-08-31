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


// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Carbon Tracker Backend Running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server Running on Port ${PORT}`);
});