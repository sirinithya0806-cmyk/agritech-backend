const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const harvestRoutes = require("./routes/harvestRoutes");
const marketRoutes = require("./routes/marketRoutes");
const requirementRoutes = require("./routes/requirementRoutes");
const orderRoutes = require("./routes/orderRoutes");
const transportRoutes = require("./routes/transportRoutes");
const farmPoolRoutes = require("./routes/farmPoolRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes =
    require("./routes/notificationRoutes");

const sellingDecisionRoutes =
    require("./routes/sellingDecisionRoutes");

const app = express();


// ================================
// MIDDLEWARE
// ================================

app.use(cors());

app.use(express.json());


// ================================
// API ROUTES
// ================================

app.use("/api/auth", authRoutes);

app.use("/api/harvests", harvestRoutes);

app.use("/api/markets", marketRoutes);

app.use("/api/requirements", requirementRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/transport", transportRoutes);

app.use("/api/farm-pools", farmPoolRoutes);

app.use("/api/messages", messageRoutes);

app.use(
    "/api/notifications",
    notificationRoutes
);

app.use(
    "/api/selling-decision",
    sellingDecisionRoutes
);
// ================================
// ROOT ROUTE
// ================================

app.get("/", (req, res) => {
    res.send("Welcome to AgriTech Backend!");
});


// ================================
// HEALTH CHECK
// ================================

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AgriTech Backend is Working!"
    });
});


// ================================
// 404 ROUTE
// ================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});


// ================================
// CONNECT DATABASE
// ================================

connectDB();


// ================================
// START SERVER
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `AgriTech server running on http://localhost:${PORT}`
    );
});