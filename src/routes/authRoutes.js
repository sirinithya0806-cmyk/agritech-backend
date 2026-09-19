const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    getMe
} = require("../controllers/authController");

const authMiddleware =
    require("../middleware/authMiddleware");


// Register
router.post("/register", registerUser);


// Login
router.post("/login", loginUser);


// Current logged-in user
router.get("/me", authMiddleware, getMe);


module.exports = router;