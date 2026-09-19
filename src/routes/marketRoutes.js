const express = require("express");

const router = express.Router();

const {
    createMarket,
    getMarkets,
    getMarketById,
    updateMarket,
    deleteMarket
} = require("../controllers/marketController");

const authMiddleware =
    require("../middleware/authMiddleware");


// Create market
router.post(
    "/",
    authMiddleware,
    createMarket
);


// Get all markets
router.get(
    "/",
    authMiddleware,
    getMarkets
);


// Get one market
router.get(
    "/:id",
    authMiddleware,
    getMarketById
);


// Update market
router.put(
    "/:id",
    authMiddleware,
    updateMarket
);


// Delete market
router.delete(
    "/:id",
    authMiddleware,
    deleteMarket
);


module.exports = router;