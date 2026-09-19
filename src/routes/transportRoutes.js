const express = require("express");

const router = express.Router();

const {
    createTransport,
    getAvailableTransport,
    getMyTransport,
    updateTransport
} = require("../controllers/transportController");

const authMiddleware =
    require("../middleware/authMiddleware");


// Add transport
router.post(
    "/",
    authMiddleware,
    createTransport
);


// Get available transport
router.get(
    "/available",
    authMiddleware,
    getAvailableTransport
);


// Get my transport
router.get(
    "/my",
    authMiddleware,
    getMyTransport
);


// Update transport
router.put(
    "/:id",
    authMiddleware,
    updateTransport
);


module.exports = router;